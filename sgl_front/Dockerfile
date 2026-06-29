# ─── Etapa 1: Build de Astro ─────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

# PUBLIC_API_URL se baja al JS del browser (Vite lo incrusta en tiempo de build).
# El valor por defecto /api funciona cuando Caddy hace proxy de /api/* al backend.
ARG PUBLIC_API_URL=/api
ARG PUBLIC_TURNSTILE_SITE_KEY
# Solo para el fetch SSG de index.astro — no se expone al browser
ARG ASTRO_BUILD_BACKEND_URL=http://localhost:8080/api
ENV PUBLIC_API_URL=$PUBLIC_API_URL
ENV PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY
ENV ASTRO_BUILD_BACKEND_URL=$ASTRO_BUILD_BACKEND_URL

COPY . .
RUN npm run build

# ─── Etapa 2: Servidor de preview ────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/astro.config.mjs ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 4321

CMD ["node_modules/.bin/astro", "preview", "--host", "0.0.0.0", "--port", "4321"]
