# Guía de despliegue — SGL en Vultr (Ubuntu)

Servidor único con Docker Compose, PostgreSQL, Spring Boot y Astro detrás de Caddy como reverse proxy. Cloudflare actúa de proxy TLS (modo **Full**) usando un **Origin Certificate**.

---

## Requisitos del servidor

- Ubuntu 22.04 LTS (1–2 vCPU, 1–2 GB RAM)
- Docker Engine + Docker Compose plugin instalados
- Puerto 80 y 443 abiertos en el firewall
- Dominio `alexcontreras.cl` apuntando a la IP del servidor en Cloudflare (Proxy activado ☁️)

### Instalar Docker en Ubuntu

```bash
ssh root@64.176.9.202
```

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Cierra sesión y vuelve a entrar para aplicar el grupo
```

---

## Parte 1 — Certificado Origin de Cloudflare

1. En el panel de Cloudflare → **SSL/TLS → Origin Server → Create Certificate**
2. Tipo: RSA, hostnames: `alexcontreras.cl`, `*.alexcontreras.cl`, validez: 15 años
3. Descarga el certificado y la clave privada
4. En el servidor:

```bash
mkdir -p /ruta/al/repo/certs
# Pega el contenido del certificado
nano /ruta/al/repo/certs/origin.pem
# Pega el contenido de la clave privada
nano /ruta/al/repo/certs/origin.key
chmod 600 certs/origin.key
```

5. En Cloudflare → **SSL/TLS → Overview** → modo **Full** (no Full Strict, porque el Origin Certificate no es de una CA pública)

---

## Parte 2 — Clonar el repositorio y configurar variables

```bash
git clone <url-del-repo> /opt/sgl
cd /opt/sgl
cp .env.example .env
nano .env   # Rellena todas las variables obligatorias
```

Variables mínimas para que el sistema arranque:

| Variable | Descripción |
|----------|-------------|
| `POSTGRES_PASSWORD` | Contraseña de la BD |
| `JWT_SECRET` | Mínimo 32 chars (`openssl rand -hex 32`) |
| `ADMIN_PASSWORD` | Contraseña del panel admin |
| `ALLOWED_ORIGIN` | `https://alexcontreras.cl` |
| `TURNSTILE_SECRET_KEY` | Secret Key de Cloudflare Turnstile |
| `PUBLIC_TURNSTILE_SITE_KEY` | Site Key de Cloudflare Turnstile |
| `TRANSBANK_API_KEY` | API Key de Transbank |

---

## Parte 3 — Primer despliegue

### Opción A — Despliegue rápido (recomendado para demo)

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

> La página de inicio (`/`) mostrará "servicios no disponibles" hasta el paso B, porque el build del frontend ocurre antes de que el backend esté corriendo. El **flujo de agendamiento funciona correctamente** desde el primer momento.

### Opción B — Despliegue completo con SSG de servicios

Para que la landing page pre-renderice los servicios en el HTML inicial:

```bash
# 1. Levanta base de datos y backend
docker compose -f docker-compose.prod.yml up -d --build postgres backend

# 2. Espera a que el backend esté listo (~30 s)
until curl -sf http://localhost:8080/api/health; do sleep 5; done
echo "Backend listo"

# 3. Construye y levanta el resto (frontend puede llegar al backend durante el build)
docker compose -f docker-compose.prod.yml up -d --build frontend caddy sgl_backup
```

---

## Parte 4 — Verificación post-despliegue

```bash
# Servicios corriendo
docker compose -f docker-compose.prod.yml ps

# Logs en tiempo real
docker compose -f docker-compose.prod.yml logs -f

# Health check del backend
curl http://localhost:8080/api/health

# El sitio responde en HTTPS
curl -I https://alexcontreras.cl
```

Checklist manual:

- [ ] `https://alexcontreras.cl` carga la landing page
- [ ] `https://alexcontreras.cl/agendar` permite completar el flujo (4 pasos)
- [ ] El panel admin en `https://alexcontreras.cl/admin` solicita login
- [ ] Login con `ADMIN_EMAIL` / `ADMIN_PASSWORD` funciona
- [ ] Los agendamientos aparecen en la tabla del admin

---

## Parte 5 — Actualizaciones

```bash
cd /opt/sgl
git pull

# Reconstruir y reiniciar sólo los servicios que cambiaron
docker compose -f docker-compose.prod.yml up -d --build

# Si solo cambió el backend:
docker compose -f docker-compose.prod.yml up -d --build backend

# Si solo cambió el frontend:
docker compose -f docker-compose.prod.yml up -d --build frontend
```

---

## Comandos útiles

```bash
# Ver logs de un servicio específico
docker compose -f docker-compose.prod.yml logs -f backend

# Entrar a la base de datos
docker exec -it sgl_postgres_prod psql -U sgl_user -d sgl_db

# Reiniciar un servicio sin rebuild
docker compose -f docker-compose.prod.yml restart backend

# Detener todo (preserva volúmenes y datos)
docker compose -f docker-compose.prod.yml down

# Detener y eliminar datos (¡DESTRUCTIVO!)
docker compose -f docker-compose.prod.yml down -v
```

---

## Notas de seguridad

- El puerto **8080 del backend NO está expuesto** públicamente. Sólo es accesible desde `localhost` del servidor y desde la red interna de Docker. Caddy enruta `/api/*` al backend internamente.
- `SGL_SEED_DEMO` no está definida en producción → el `DataSeeder` no inserta datos de prueba.
- `SPRING_PROFILES_ACTIVE=prod` activa la validación estricta de `ADMIN_PASSWORD` al arrancar.
- El Caddyfile pasa `CF-Connecting-IP` como `X-Forwarded-For` al backend para que el rate-limiter (20 req/min por IP) use la IP real del usuario y no la de Cloudflare.
