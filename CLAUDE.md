# CLAUDE.md

Este archivo provee contexto a Claude Code al trabajar en este repositorio.

---

## Descripción del Proyecto

**SGL** (Sistema de Gestión Legal) es un sistema de gestión para estudio jurídico con:
- **Público:** Agendamiento de consultas sin login para clientes
- **Panel admin:** Gestión de agendamientos, confirmación de pagos y administración de servicios
- **Estructura monorepo:** Frontend Astro + Backend Spring Boot + Base de datos PostgreSQL

---

## Cómo Levantar el Proyecto

### Requisitos previos
- Node.js ≥ 22.12.0 (frontend)
- Java 21 (backend)
- Docker y Docker Compose (base de datos)
- Maven 3.8.x+ (build backend)

### Desarrollo local

**Paso 1 — Levantar PostgreSQL**
```bash
docker compose up -d postgres
```

**Paso 2 — Ejecutar Backend**

Configurar en IntelliJ → Run → Edit Configurations → Environment Variables:
```
SPRING_DATASOURCE_USERNAME=sgl_user
SPRING_DATASOURCE_PASSWORD=sgl_pass
JWT_SECRET=dev-local-secret-change-me-32bytes
SPRING_PROFILES_ACTIVE=dev
MAILTRAP_API_TOKEN=<tu token>
```
- Health check: `http://localhost:8080/api/health`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

**Paso 3 — Ejecutar Frontend**
```bash
cd sgl_front
npm install   # solo la primera vez
npm run dev   # http://localhost:4321
```

### Build para producción

**Backend:**
```bash
cd sgl_back/sgl_back
./mvnw clean package
```

**Frontend:**
```bash
cd sgl_front
npm run build
```

---

## Tests y Linting

### Backend
```bash
cd sgl_back/sgl_back

# Todos los tests
./mvnw test

# Test específico
./mvnw test -Dtest=AppointmentServiceTest

# Reporte de cobertura JaCoCo (mínimo 60% de líneas)
./mvnw test jacoco:report
open target/site/jacoco/index.html
```

Stack de testing: JUnit 5, Mockito, H2 en memoria.
Excluidos de cobertura: config, controllers, DTOs, entities, exceptions.

### Frontend
```bash
cd sgl_front
npx tsc --noEmit
```

Sin ESLint/Prettier configurado.

---

## Arquitectura

### Frontend (`sgl_front/`) — Astro 6 + React 19 + Tailwind v4

- **Páginas** (`.astro`): Rutas estáticas — `index`, `agendar`, `confirmacion`, `admin/dashboard`, `admin/calendario`, `admin/servicios`, páginas legales
- **Componentes** (`.tsx`): React solo para flujos interactivos:
  - Agendamiento: `AgendarFlow.tsx`, `PasoServicio.tsx`, `PasoDatos.tsx`, `PasoFechaHora.tsx`, `PasoResumen.tsx`
  - Admin: `AppointmentTable.tsx`, `AppointmentDetail.tsx`, `ConfirmPaymentModal.tsx`, `CalendarioAdmin.tsx`, `ServiciosAdmin.tsx`, `EditPriceModal.tsx`
- **Layouts**: `BaseLayout.astro` (público), `AdminLayout.astro` (protegido)
- **Estilos**: Tailwind v4 — colores y fuentes en `src/styles/global.css` con bloque `@theme` (NO en tailwind.config.mjs)

### Backend (`sgl_back/sgl_back/`) — Spring Boot 3.4.5 + Java 21

**Controllers (`cl.sgl.controller.*`):**
- `PublicAppointmentController` — endpoints públicos de agendamiento (sin JWT)
- `PublicServiceController` — listado público de servicios (sin JWT)
- `AppointmentController` — panel admin, protegido con JWT
- `AuthController` — login/logout
- `LegalServiceController` — CRUD de servicios + historial de precios
- `WebpayController` — integración Transbank Webpay Plus

**Services (`cl.sgl.service.*`):**
- `AppointmentService` — CRUD, disponibilidad, confirmación de pago, generación de ID externo (`AG-YYYY-NNNN`)
- `LegalServiceService` — gestión de servicios y historial de precios
- `EmailService` — envío de emails HTML via Mailtrap SDK

**Seguridad:**
- `SecurityConfig` — CORS (origen único via env var), CSRF deshabilitado, JWT stateless
- `JwtUtil` — generación/validación HS256 (8 horas de expiración)
- `JwtAuthFilter` — Bearer token → SecurityContext
- `RateLimitFilter` — 20 req/min por IP en endpoints públicos (bucket4j)
- `InputSanitizer` — sanitización HTML OWASP (previene XSS)

**Inicio de la aplicación:**
- `DataSeeder` — inserta 4 servicios y 10 agendamientos de prueba con `SPRING_PROFILES_ACTIVE=dev`
- `AdminUserInitializer` — crea admin por defecto `admin@sgl.cl / admin123` (todos los perfiles excepto test)

### Base de datos — PostgreSQL 15, migraciones Flyway

| Migración | Contenido |
|-----------|-----------|
| V001 | `legal_services` |
| V002 | `appointments` (enum estado, ID externo, campos Webpay) |
| V003 | `service_price_history` |

---

## Flujos principales

### Agendamiento público (cliente)

1. Formulario multipaso (`agendar.astro` + `AgendarFlow.tsx`):
   - Paso 1: Seleccionar servicio → `GET /api/services`
   - Paso 2: Ingresar nombre/email/teléfono
   - Paso 3: Elegir fecha/hora → `GET /api/appointments/days-available`, `GET /api/appointments/hours-available`
   - Paso 4: Resumen + confirmar → `POST /api/appointments`
2. Backend: crea agendamiento con estado `PENDIENTE`, genera ID externo, envía email
3. Redirección a `confirmacion.astro` → muestra instrucciones de pago e ID externo
4. Opción de pago: transferencia manual o Transbank Webpay Plus

### Pago con Webpay Plus

1. `PasoResumen.tsx` muestra card seleccionable de Webpay
2. Al confirmar → `POST /api/appointments` crea cita → `POST /api/webpay/init` inicia transacción
3. Redirección automática al formulario de Transbank
4. Transbank llama `POST /api/webpay/commit` → backend confirma pago → email de confirmación
5. Frontend redirige a `confirmacion.astro?id={idExterno}` con estado desde la API

### Confirmación manual de pago (admin)

1. `AppointmentTable.tsx` lista agendamientos con tabs y paginación
2. Click en fila → `AppointmentDetail.tsx` modal
3. `ConfirmPaymentModal.tsx` → `PATCH /api/admin/appointments/{id}/pago` (código transacción + monto)
4. Backend: estado → `CONFIRMADO`, envía email de confirmación

---

## Convenciones

### Nomenclatura bilingüe (regla general)

| Ámbito | Idioma | Ejemplos |
|--------|--------|---------|
| Clases, métodos, campos, variables Java | **Inglés** | `processRetries()`, `appointmentId`, `EmailService` |
| Constantes Java | **Inglés** | `MAX_ATTEMPTS`, `BASE_INTERVAL_MIN`, `ZONE_CL` |
| Comentarios y Javadoc | **Español** | `// Busca citas confirmadas` |
| Mensajes de log | **Español** | `log.info("Email enviado →")` |
| Columnas de dominio/negocio en BD | **Español** | `nombre`, `fecha`, `estado`, `precio`, `activo` |
| Columnas técnicas/infraestructura en BD | **Inglés** | `id`, `created_at`, `updated_at`, `service_id` |
| Valores de enums de dominio | **Español** | `PENDIENTE`, `ENVIADO`, `FALLIDO` |
| Nombres de tablas | **Inglés** | `services`, `appointments`, `email_retry_queue` |

> **Regla práctica:** si es código Java → inglés; si es un valor de negocio almacenado en BD → español; si es infraestructura técnica de BD → inglés.

### Backend
- Todas las respuestas envueltas en `ApiResponse<T>` (status, message, data)
- `@ControllerAdvice` `GlobalExceptionHandler` retorna JSON de error estandarizado
- Métodos de solo lectura con `@Transactional(readOnly = true)`
- Logging via SLF4J `@Slf4j`
- Prefijo de paquetes: `cl.sgl.*`
- Nomenclatura de tests: `test<Feature><Condicion><Esperado>`

### Frontend
- Archivos `.astro` = estático/SSR; archivos `.tsx` = interactivo (`client:load` o `client:idle`)
- Colores y fuentes en `src/styles/global.css` con bloque `@theme` — no en tailwind.config.mjs
- Mobile-first: clases base para móvil, `md:` / `lg:` para pantallas más grandes
- Sin Redux/Context — fetch directo en componentes con `async/await` + try/catch
- Siempre usar locale `es-CL` y zona horaria `America/Santiago`
- Postman collection actualizada en cada historia de backend: `sgl_back/sgl_back/sgl_back.postman_collection.json`

---

## Convenciones de UI

### Skeletons
- **Usar siempre** mientras `loading === true` en cualquier componente con fetch
- El skeleton debe reflejar la silueta real del contenido (no un spinner genérico)
- Efecto shimmer: `animation: shimmer 1.6s ease-in-out infinite`
  - Keyframe `@keyframes shimmer` ya definido en `global.css`
  - Aplicar como inline style con gradiente horizontal
- Referencia: `PasoServicio.tsx` → `<SkeletonCard />`

### Cards interactivas
- Hover lift: `hover:-translate-y-0.5` + `hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]`
- Seleccionado: `boxShadow: "0 0 0 2px var(--color-sgl-gold), 0 8px 32px rgba(201,168,76,0.18)"` via inline style + `border-sgl-gold`
- Barra accent superior `h-0.5` → dorada en estado activo, `bg-transparent` en reposo
- Badge checkmark: `scale-0 opacity-0` → `scale-100 opacity-100` con `transition-all duration-200`

### Botones con estado disabled
- **No usar** `disabled:opacity-*` de Tailwind en `<button disabled>` — no aplica consistentemente en Tailwind v4
- Usar inline style: `style={{ opacity: condicion ? 1 : 0.4, cursor: condicion ? "pointer" : "not-allowed" }}`
- Padding garantizado con inline style: `style={{ padding: "12px 40px" }}`

### Transiciones entre pasos — `StepTransition.tsx`

Wrapper reutilizable para transiciones entre pasos o pantallas. Sin librerías externas.

```tsx
import StepTransition from "../StepTransition";

const [direccion, setDireccion] = useState<"forward" | "back">("forward");

function goTo(nuevoPaso: Paso, dir: "forward" | "back") {
  setDireccion(dir);
  setPaso(nuevoPaso);
}

<StepTransition key={paso} direction={direccion}>
  {paso === 1 && <PasoA />}
  {paso === 2 && <PasoB />}
</StepTransition>
```

- `direction="forward"` → entra desde abajo (+10px → 0)
- `direction="back"` → entra desde arriba (−10px → 0)
- Duración: **280ms**, easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Sin bounces, scales ni rotaciones — solo fade + traslación sutil
- Keyframes en `global.css`: `step-enter-forward`, `step-enter-back`

---

## Variables de entorno

### Backend
| Variable | Valor local | Notas |
|----------|-------------|-------|
| `SPRING_DATASOURCE_USERNAME` | `sgl_user` | Requerido |
| `SPRING_DATASOURCE_PASSWORD` | `sgl_pass` | Requerido |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/sgl_db` | |
| `JWT_SECRET` | `dev-local-secret-change-me-32bytes` | Mínimo 32 chars; cambiar en producción |
| `JWT_EXPIRATION_HOURS` | `8` | |
| `MAILTRAP_API_TOKEN` | — | Opcional; sin token no se envían emails |
| `ALLOWED_ORIGIN` | `http://localhost:4321` | CORS — un solo origen |
| `SPRING_PROFILES_ACTIVE` | `dev` | `dev` activa DataSeeder si también se define `SGL_SEED_DEMO=true` |
| `SGL_SEED_DEMO` | `true` | Si está ausente o `false`, DataSeeder no siembra nada (seguro en producción) |
| `ADMIN_PASSWORD` | — | Contraseña del admin inicial. En `dev` sin esta variable usa `admin123`; en producción es obligatoria |
| `TRANSBANK_COMMERCE_CODE` | código de integración | |
| `TRANSBANK_API_KEY` | clave de integración | |
| `TRANSBANK_ENV` | `integration` | `integration` o `production` |
| `TRANSBANK_RETURN_URL` | `http://localhost:8080/api/webpay/commit` | |
| `TRANSBANK_FRONTEND_URL` | `http://localhost:4321` | |
| `TWILIO_ACCOUNT_SID` | — | Cuenta Twilio; si no está definida, WhatsApp se omite |
| `TWILIO_AUTH_TOKEN` | — | Token de autenticación Twilio |
| `TWILIO_WHATSAPP_FROM` | `+14155238886` | Número sandbox Twilio WhatsApp |
| `TWILIO_CONTENT_SID` | — | Content Template HX... para notificación de agendamiento (SGL-034) |
| `TWILIO_PAYMENT_CONTENT_SID` | — | Content Template HX... para confirmación de pago (SGL-028) |
| `TWILIO_MENU_CONTENT_SID` | — | Content Template HX... para menú de bienvenida entrante (SGL-074); si vacío, usa texto libre |

### Frontend
| Variable | Valor local | Notas |
|----------|-------------|-------|
| `PUBLIC_API_URL` | `http://localhost:8080/api` | URL base del backend |

---

## Agregar una nueva historia

1. **Backend** (si hay cambios de API):
   - Campo en entidad → DTO (request + response) → método en service → endpoint en controller con `@Operation` Swagger → tests unitarios
   - Actualizar `sgl_back.postman_collection.json`
2. **Base de datos** (si hay cambios de esquema):
   - Crear `src/main/resources/db/migration/V00X__<descripcion>.sql` — Flyway lo ejecuta al iniciar
3. **Frontend** (si hay cambios de UI):
   - Página `.astro` o componente `.tsx` → fetch al backend → manejar loading/error con skeletons → tipos TypeScript
4. Ejecutar `./mvnw test` y `npx tsc --noEmit` antes de commitear

---

## Al completar una historia

**Obligatorio al terminar cada historia:** actualizar `context/session-state.md` con estos cambios:

1. **Estado actual** → cambiar `Última historia completada` al ID y alias recién terminado
2. **En desarrollo** → actualizar la lista de historias en desarrollo si corresponde
3. **Próxima historia** → actualizar con la siguiente según el orden de implementación
4. **Tabla de completadas R2** → agregar fila con: ID, alias, archivos clave modificados, fecha de hoy
5. **Progreso R2** → incrementar el contador de completadas y decrementar pendientes
6. **Decisiones técnicas** → agregar fila si se tomó alguna decisión técnica nueva durante la implementación
7. **Deuda técnica** → agregar nota si algo quedó incompleto o tiene una mejora pendiente
8. **Postman collection** → si la historia agregó o modificó endpoints, actualizar
      `sgl_back/sgl_back/sgl_back.postman_collection.json` con los nuevos requests

Ejemplo de fila para agregar en la tabla:
```
| SGL-XXX | ALIAS | ArchivoPrincipal.java, OtroArchivo.tsx | DD/MM/YYYY |
```

## Componentes de infraestructura

| Componente | Descripción | Activación |
|------------|-------------|-----------|
| `cl.sgl.config.DataSeeder` | Inserta 4 servicios y 10 agendamientos de prueba (estados mixtos, fechas próximas 30 días, nombres chilenos) | `SGL_SEED_DEMO=true` (cualquier perfil; por defecto NO siembra) |
| `cl.sgl.config.AdminUserInitializer` | Crea admin `admin@sgl.cl`. Contraseña desde `ADMIN_PASSWORD`; si no está definida usa `admin123` solo en perfil `dev` (ERROR en prod) | Todos los perfiles excepto `test` |

---

## Comandos útiles

```bash
# Ver base de datos
docker exec -it sgl_postgres psql -U sgl_user -d sgl_db

# Resetear base de datos local (destructivo)
docker compose down -v && docker compose up -d postgres
```

---

## Archivos de contexto

Leer siempre estos archivos antes de implementar una historia:

| Archivo | Contenido |
|---------|-----------|
| `context/user-stories.md` | Backlog completo por release (R1/R2/R3) con criterios |
| `context/session-state.md` | Historias completadas, decisiones técnicas, deuda técnica |
| `context/dod.md` | Checklist de Definition of Done |
| `context/style-guide.md` | Sistema de diseño (colores, tipografía, patrones de componentes) |

---

## Trabajo pendiente R1

| Historia | Estado |
|----------|--------|
| SGL-027 AG-CAPTCHA | Sin implementar — requiere Google reCAPTCHA keys |
| SGL-029 AG-EMAIL-CONF | Sin implementar |
| SGL-037 NOTIF-ID | Sin implementar |
| SGL-044 ADM-DASH | Parcial — KPIs funcionales client-side, falta endpoint dedicado |
| SGL-094 RISK-WA-FALLBACK | Bloqueada — espera historias WhatsApp de R2 |

---

## Deuda técnica

- `docker-compose.yml` levanta `postgres` y `sgl_backup`. Los servicios `backend` y `frontend` están declarados pero necesitan Dockerfile propio (candidatos a SGL-095 OPS-DEPLOY)
- SGL-044 ADM-DASH: KPIs calculados client-side; debería tener endpoint dedicado `/api/admin/dashboard/kpis`
- SGL-049 ADM-CAL: agendamientos CANCELADOS aparecen en el calendario — pendiente filtrar en backend con parámetro `?excluirCancelados=true`
- SGL-085 OPS-BACKUP: revisar si `flyway_schema_history` debe incluirse en el procedimiento de restauración documentado