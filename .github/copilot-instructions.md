# SGL — Sistema de Gestión Legal
## Instrucciones para GitHub Copilot (leídas automáticamente en cada sesión)

---

## PROYECTO
Sitio web para estudio jurídico. Clientes agendan consultas **sin login**.
Administrador gestiona agendamientos, confirma pagos y genera cotizaciones PDF.

## STACK
| Capa | Tecnología |
|------|-----------|
| Frontend | Astro (SSG/SSR) + React 18 + Tailwind CSS |  shadcn/ui para panel de admin
| Backend | Java 21 + Spring Boot 3.x + Spring Security + JWT |
| Base de datos | PostgreSQL |
| ORM | Spring Data JPA |
| Email | Spring Mail / SendGrid |
| WhatsApp | Twilio SDK |
| PDF | iText o Apache PDFBox |
| Build | Maven (backend) / npm (frontend) |
| Infra local | Docker + Docker Compose |
| CI/CD | GitHub Actions |

## ESTRUCTURA DEL REPO
```
sgl/
├── sgl_front/   ← Astro + React
└── sgl_back/    ← Spring Boot monorepo
```

## REGLAS — SIEMPRE APLICAR
1. **Una historia a la vez.** Nunca implementes más de lo solicitado.
2. **Solo dependencias declaradas** en pom.xml o package.json. Si falta algo, pregunta.
3. **Astro para páginas estáticas/SSR**, React solo para componentes interactivos.
4. **Backend = API REST** documentada con Swagger. 
5. **Clientes nunca se loguean.** JWT es exclusivo del administrador.
6. **Pregunta antes de asumir** si algo del requerimiento no está claro.
7. Todo código debe cumplir el DoD en `context/dod.md`.

## SEGURIDAD — OBLIGATORIO
- JWT para admin, validado en cada request
- Inputs sanitizados (XSS / SQL Injection)
- reCAPTCHA v3 en formulario público
- Rate limiting en endpoints públicos
- bcrypt para passwords
- CORS restrictivo
- HTTPS en producción

## CONVENCIONES BACKEND
- Paquete base: `cl.sgl`
- Capas: `controller` → `service` → `repository` → `entity`
- DTOs separados de entidades JPA
- `@ControllerAdvice` para manejo global de excepciones
- Respuestas HTTP estandarizadas

## CONVENCIONES FRONTEND
- Páginas en `src/pages/`
- Componentes React en `src/components/`
- Layouts en `src/layouts/`
- Mobile-first con Tailwind
- Zona horaria: `es-CL` / `America/Santiago`
- Tailwind v4: colores y fuentes se definen en `src/styles/global.css` con @theme, NO en tailwind.config.mjs

## ARCHIVOS DE CONTEXTO ADICIONAL
Para implementar una historia, referencia estos archivos con # en el chat de Copilot:
- `#context/user-stories.md` → todas las historias por épica con criterios
- `#context/dod.md` → Definition of Done completo
- `#context/session-state.md` → estado actual del proyecto
