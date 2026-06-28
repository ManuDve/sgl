# Historias de Usuario — SGL
> Organizado por Release. **Foco actual: R1**
> Columnas: ID | Alias | Historia resumida | Tamaño | Prioridad

---

## 🎯 RELEASE 1 — Foco actual
**Release Goal:** Flujo completo de agendamiento público + panel administrativo básico (visualizar agendamientos y confirmar pagos). El sistema debe ser usable, seguro y trazable.

### SGL1 — Landing Page (R1)
| ID | Alias | Historia | Tamaño |
|----|-------|----------|--------|
| SGL-001 | LP-HOME | Como Visitante, ver página de inicio con propuesta de valor y llamado a la acción. | XS |
| SGL-002 | LP-NAV | Como Visitante, navegar entre Inicio, Servicios y Agendar. | XS |
| SGL-003 | LP-CONTACT | Como Visitante, ver información de contacto (teléfono, email, dirección y WhatsApp). | XS |
| SGL-004 | LP-RESP | Como Visitante, usar el sitio desde móvil y desktop (responsive). | S |
| SGL-006 | LP-SEO-META | Como Visitante, que el sitio tenga etiquetas SEO (title, meta description, OpenGraph). | XS |
| SGL-009 | LP-SERV-LIST | Como Visitante, ver sección "Servicios" con lista de materias legales y precios referenciales. | S |
| SGL-010 | LP-SERV-DETAIL | Como Visitante, ver el detalle de un servicio (descripción y precio). | XS |
| SGL-012 | LP-LEGAL-TC | Como Visitante, ver página de Términos y Condiciones. | S |
| SGL-013 | LP-LEGAL-PRIV | Como Visitante, ver Política de Privacidad. | S |

### SGL2 — Agendamiento (R1)
| ID | Alias | Historia | Tamaño |
|----|-------|----------|--------|
| SGL-016 | AG-NOLOGIN | Como Cliente, iniciar agendamiento sin crear cuenta. | XS |
| SGL-017 | AG-DATOS | Como Cliente, ingresar nombre, email y teléfono. | XS |
| SGL-018 | AG-SELECT-MAT | Como Cliente, seleccionar la materia legal del servicio. | XS |
| SGL-020 | AG-FECHAS | Como Cliente, ver fechas disponibles (próximos días hábiles). | S |
| SGL-021 | AG-HORAS | Como Cliente, ver horas disponibles por fecha. | S |
| SGL-022 | AG-VALID | Como Cliente, que el sistema valide campos obligatorios y formato (email/teléfono). | XS |
| SGL-023 | AG-RESUMEN | Como Cliente, ver resumen del agendamiento (materia, fecha, hora, monto) antes de confirmar. | XS |
| SGL-024 | AG-IDEXTERNO | Como Cliente, que el sistema genere un ID externo de cita (ej: AG-AAAA-NNNN). | S |
| SGL-025 | AG-CONF-SCREEN | Como Cliente, recibir pantalla de confirmación con los detalles. | XS |
| SGL-026 | AG-PAGO-INST | Como Cliente, recibir instrucciones de pago por transferencia (datos bancarios, plazo, referencia). | S |
| SGL-027 | AG-CAPTCHA | Como Cliente, que el formulario tenga protección anti-bots (reCAPTCHA v3). | S |
| SGL-029 | AG-EMAIL-CONF | Como Cliente, recibir confirmación por email. | S |
| SGL-031 | AG-POLICY | Como Cliente, ver política visible de cancelación/reagendamiento. | XS |
| SGL-032 | AG-DATOS-SEC | Como Cliente, que mis datos se almacenen de forma segura. | S |
| SGL-078 | PAY-METHODS | Como Cliente, ver medios de pago disponibles (transferencia hoy, pasarela futuro). | XS |
| SGL-100 | LEGAL-CONSENT | Como Cliente, registro de consentimientos (aceptación TC/privacidad). | S |

### SGL3 — Notificaciones (R1)
| ID | Alias | Historia | Tamaño |
|----|-------|----------|--------|
| SGL-033 | NOTIF-EMAIL-01 | Como Sistema, enviar email de confirmación de agendamiento al cliente. | S |
| SGL-037 | NOTIF-ID | Como Sistema, incluir el ID de la cita en todas las notificaciones. | XS |
| SGL-094 | RISK-WA-FALLBACK | Como Admin, tener flujo degradado si WhatsApp falla (solo email), para no detener el agendamiento. | S |

### SGL4 — Panel Administrativo (R1)
| ID | Alias | Historia | Tamaño |
|----|-------|----------|--------|
| SGL-041 | ADM-LOGIN | Como Admin, autenticarme con email y contraseña. | S |
| SGL-042 | ADM-LOGOUT | Como Admin, cerrar sesión. | XS |
| SGL-043 | ADM-AUTH-JWT | Como Admin, que la sesión use JWT. | M |
| SGL-044 | ADM-DASH | Como Admin, ver dashboard con KPIs (pendientes, confirmados, cancelados, ingresos). | S |
| SGL-045 | ADM-LIST-PEND | Como Admin, listar agendamientos pendientes de pago. | S |
| SGL-101 | ADM-LIST-PEND-2 | Como Admin, revisar el listado de agendamientos con paginación y orden por fecha configurable para identificar fácilmente los más recientes. | S |
| SGL-046 | ADM-DETAIL | Como Admin, ver detalle completo de un agendamiento. | S |
| SGL-047 | ADM-STATE | Como Admin, cambiar estado de agendamiento (pendiente/confirmado/cancelado/reagendado). | S |
| SGL-048 | PAY-MANUAL-CONF | Como Admin, confirmar pago registrando número de transacción y monto. | S |
| SGL-049 | ADM-CAL | Como Admin, ver calendario ordenado por fecha y hora. | S |
| SGL-052 | ADM-SERV-CRUD | Como Admin, gestionar servicios (crear/editar/eliminar). | M |
| SGL-053 | ADM-SERV-PRICE | Como Admin, actualizar precios de servicios y registrar historial. | S |
| SGL-056 | ADM-SEC-API | Como Admin, tener CORS/CSRF y rate limiting en API. | M |
| SGL-085 | OPS-BACKUP | Como Admin, tener backup de base de datos programado. | M |
| SGL-097 | SEC-RATELIMIT | Como Admin, rate limiting en endpoints públicos. | S |
| SGL-098 | SEC-INPUT | Como Admin, sanitización/validación de inputs (XSS/SQLi). | M |

---

## RELEASE 2 — Backlog
> No implementar hasta completar R1

| ID | Alias | Épica | Tamaño | Prioridad |
|----|-------|-------|--------|-----------|
| SGL-005 | LP-PERF | SGL1 | S | SHOULD |
| SGL-007 | LP-SITEMAP | SGL1 | XS | SHOULD |
| SGL-011 | LP-A11Y | SGL1 | S | SHOULD |
| SGL-015 | LP-CMS-LITE | SGL1 | S | SHOULD |
| SGL-019 | AG-DESC | SGL2 | XS | SHOULD |
| SGL-028 | AG-WA-CONF | SGL2 | S | SHOULD |
| SGL-030 | AG-CONFLICT | SGL2 | S | SHOULD |
| SGL-034 | NOTIF-WA-01 | SGL3 | M | MUST |
| SGL-035 | NOTIF-REMIND | SGL3 | M | SHOULD |
| SGL-036 | NOTIF-ADMIN-NEW | SGL3 | S | SHOULD |
| SGL-038 | NOTIF-RETRY | SGL3 | M | SHOULD |
| SGL-039 | NOTIF-TEMPL | SGL3 | S | SHOULD |
| SGL-040 | NOTIF-AUDIT | SGL3 | S | SHOULD |
| SGL-050 | ADM-FILTER | SGL4 | S | SHOULD |
| SGL-051 | ADM-EXPORT | SGL4 | S | SHOULD |
| SGL-054 | ADM-USERS | SGL4 | S | SHOULD |
| SGL-055 | ADM-AUDIT | SGL4 | M | SHOULD |
| SGL-057 | COT-FROM-APPT | SGL5 | S | SHOULD |
| SGL-058 | COT-FREE | SGL5 | S | SHOULD |
| SGL-059 | COT-FIELDS | SGL5 | XS | SHOULD |
| SGL-060 | COT-PDF | SGL5 | M | SHOULD |
| SGL-061 | COT-EMAIL | SGL5 | S | SHOULD |
| SGL-063 | COT-CLIENT-RECV | SGL5 | S | SHOULD |
| SGL-064 | GES-REAG-WEB | SGL6 | S | SHOULD |
| SGL-065 | GES-CANCEL-WEB | SGL6 | S | SHOULD |
| SGL-066 | GES-OTP | SGL6 | M | SHOULD |
| SGL-067 | GES-VERIFY | SGL6 | S | SHOULD |
| SGL-068 | GES-OTP-EXP | SGL6 | S | SHOULD |
| SGL-069 | GES-REAG-SLOT | SGL6 | S | SHOULD |
| SGL-070 | GES-POLICY | SGL6 | S | SHOULD |
| SGL-071 | GES-ADMIN-REAG | SGL6 | S | SHOULD |
| SGL-072 | GES-ADMIN-CANCEL | SGL6 | S | SHOULD |
| SGL-073 | GES-NOTIF | SGL6 | S | SHOULD |
| SGL-074 | WA-MENU | SGL2 | M | SHOULD |
| SGL-075 | WA-CONSULT | SGL2 | M | SHOULD |
| SGL-076 | WA-LINK | SGL2 | M | SHOULD |
| SGL-077 | WA-COMPLIANCE | SGL3 | S | MUST |
| SGL-083 | CFG-ESTUDIO | SGL4 | M | SHOULD |
| SGL-084 | NFR-TZ | SGL4 | XS | SHOULD |
| SGL-086 | OPS-MON | SGL4 | M | SHOULD |
| SGL-087 | OPS-CICD | SGL4 | M | SHOULD |
| SGL-089 | DOC-SWAGGER | SGL4 | S | SHOULD |
| SGL-093 | RISK-PO-AVAIL | SGL4 | XS | SHOULD |
| SGL-095 | OPS-DEPLOY | SGL4 | M | SHOULD |
| SGL-096 | NFR-COMPAT | SGL4 | S | SHOULD |
| SGL-099 | SEC-ENCRYPT | SGL4 | M | SHOULD |

---

## RELEASE 3 — Backlog futuro
> COULD — implementar solo si hay tiempo y R1+R2 están completos

| ID | Alias | Épica |
|----|-------|-------|
| SGL-008 | LP-ROBOTS | SGL1 |
| SGL-014 | LP-LEGAL-COOK | SGL1 |
| SGL-062 | COT-HISTORY | SGL5 |
| SGL-079 | PAY-UPLOAD | SGL4 |
| SGL-080 | PAY-POC | SGL7 |
| SGL-081 | PAY-REJECT | SGL7 |
| SGL-082 | PAY-REJECT-NOTIF | SGL7 |
| SGL-088 | OPS-SONAR | SGL4 |
| SGL-090 | NFR-DELETE | SGL4 |
| SGL-091 | NFR-WIP-QUEUE | SGL4 |

---

## Orden de implementación R1 (por dependencias técnicas)

```
1. Base técnica
   └── Docker + PostgreSQL + Spring Boot skeleton + Astro skeleton

2. Datos base
   └── SGL-052 ADM-SERV-CRUD  (los servicios los necesita el formulario)

3. Agendamiento público
   └── SGL-016 AG-NOLOGIN → SGL-017 AG-DATOS → SGL-018 AG-SELECT-MAT
   └── SGL-020 AG-FECHAS → SGL-021 AG-HORAS → SGL-022 AG-VALID
   └── SGL-023 AG-RESUMEN → SGL-024 AG-IDEXTERNO → SGL-025 AG-CONF-SCREEN
   └── SGL-026 AG-PAGO-INST → SGL-031 AG-POLICY → SGL-078 PAY-METHODS
   └── SGL-027 AG-CAPTCHA → SGL-032 AG-DATOS-SEC → SGL-100 LEGAL-CONSENT

4. Notificaciones email
   └── SGL-033 NOTIF-EMAIL-01 → SGL-037 NOTIF-ID → SGL-094 RISK-WA-FALLBACK
   └── SGL-029 AG-EMAIL-CONF

5. Landing page
   └── SGL-001 LP-HOME → SGL-002 LP-NAV → SGL-003 LP-CONTACT
   └── SGL-004 LP-RESP → SGL-006 LP-SEO-META
   └── SGL-009 LP-SERV-LIST → SGL-010 LP-SERV-DETAIL
   └── SGL-012 LP-LEGAL-TC → SGL-013 LP-LEGAL-PRIV

6. Panel administrativo
   └── SGL-041 ADM-LOGIN → SGL-042 ADM-LOGOUT → SGL-043 ADM-AUTH-JWT
   └── SGL-044 ADM-DASH → SGL-045 ADM-LIST-PEND → SGL-046 ADM-DETAIL
   └── SGL-047 ADM-STATE → SGL-048 PAY-MANUAL-CONF → SGL-049 ADM-CAL
   └── SGL-053 ADM-SERV-PRICE

7. Seguridad transversal
   └── SGL-056 ADM-SEC-API → SGL-097 SEC-RATELIMIT → SGL-098 SEC-INPUT

8. Operaciones
   └── SGL-085 OPS-BACKUP
```
