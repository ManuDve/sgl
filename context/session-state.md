# Session State — SGL
> Actualizar manualmente al terminar cada historia

---

## Estado actual
- **Release activo:** R2
- **Fase:** Desarrollo
- **Última historia completada:** SGL-055 ADM-AUDIT — registro y vista de auditoría de acciones admin
- **En desarrollo:** SGL-084 NFR-TZ, SGL-096 NFR-COMPAT
- **Próxima historia:** SGL-084 NFR-TZ

---

## Historias R1 completadas
| ID | Alias | Archivos clave | Fecha |
|----|-------|----------------|-------|
| BASE | Base técnica | docker-compose.yml, application.yml, estructura cl.sgl | 08/05/2026 |
| SGL-052 | ADM-SERV-CRUD | entity/LegalService.java, LegalServiceService, LegalServiceController, LegalServiceServiceTest, V001 SQL | 08/05/2026 |
| SGL-001 | LP-HOME | sgl_front/src/pages/index.astro, BaseLayout.astro, global.css, tailwind.config.mjs | 08/05/2026 |
| SGL-041 | ADM-LOGIN (back) | AuthController, AuthService, LoginRequest/Response, UnauthorizedException, GlobalExceptionHandler, AuthServiceTest, postman | 08/05/2026 |
| SGL-041 | ADM-LOGIN (front) | src/pages/admin/login.astro, src/components/admin/LoginForm.tsx | 08/05/2026 |
| SGL-042 | ADM-LOGOUT | src/components/admin/LogoutButton.tsx, src/layouts/AdminLayout.astro | 08/05/2026 |
| SGL-045 | ADM-LIST-PEND (back) | AppointmentStatus.java, Appointment.java, AppointmentSummaryDTO, AppointmentRepository, AppointmentService, AppointmentController, AppointmentServiceTest, V002 SQL, postman | 08/05/2026 |
| SGL-045 | ADM-LIST-PEND (front) | src/components/admin/AppointmentTable.tsx, src/pages/admin/dashboard.astro | 08/05/2026 |
| SGL-044 | ADM-DASH (parcial) | src/components/admin/DashboardKPIs.tsx — KPIs calculados client-side desde /api/admin/appointments | 08/05/2026 |
| SGL-046 | ADM-DETAIL (back) | dto/AppointmentDetailDTO.java, AppointmentService#getById, AppointmentController GET /{id}, AppointmentServiceTest (+3 casos), postman | 08/05/2026 |
| SGL-046 | ADM-DETAIL (front) | src/components/admin/AppointmentDetail.tsx (modal), AppointmentTable.tsx (filas clickeables + selectedId) | 08/05/2026 |
| SGL-016 | AG-NOLOGIN | Appointment.java (+aceptaTerminos), SecurityConfig (/api/appointments/** explícito), PublicAppointmentController (GET /ping), V002 SQL, postman | 08/05/2026 |
| SGL-018 | AG-SELECT-MAT (back) | ServicePublicDTO.java, LegalServiceService#getPublicServices, PublicServiceController (GET /api/services), SecurityConfig (/api/services/**), LegalServiceServiceTest (+2 casos), postman | 08/05/2026 |
| SGL-018 | AG-SELECT-MAT (front) | src/pages/agendar.astro, src/components/agendar/AgendarFlow.tsx, src/components/agendar/PasoServicio.tsx | 08/05/2026 |
| SGL-017 | AG-DATOS (front) | src/components/agendar/PasoDatos.tsx, AgendarFlow.tsx (paso 2 activado) | 08/05/2026 |
| SGL-021 | AG-HORAS (back) | AppointmentRepository#findBookedHoursForDate (JPQL), AppointmentService#getAvailableHours + buildSlots, PublicAppointmentController GET /hours-available, AppointmentServiceTest (+4 casos), postman | 08/05/2026 |
| SGL-020 | AG-FECHAS (back) | AppointmentService#getAvailableDays, PublicAppointmentController GET /days-available (?from&days), AppointmentServiceTest (+5 casos), postman | 08/05/2026 |
| SGL-020 + SGL-021 | AG-FECHAS/AG-HORAS (front) | src/components/agendar/PasoFechaHora.tsx, AgendarFlow.tsx (paso 3 activado) | 08/05/2026 |
| SGL-022 | AG-VALID (front) | PasoDatos.tsx — VALIDATORS, touched/errors state, onBlur, re-validación en onChange | 08/05/2026 |
| SGL-023 | AG-RESUMEN (front) | src/components/agendar/PasoResumen.tsx, AgendarFlow.tsx (paso 4 activado) | 08/05/2026 |
| SGL-024 | AG-IDEXTERNO (back) | CreateAppointmentRequest.java, AppointmentRepository#existsByFechaAndHoraAndEstadoNot, AppointmentService#createAppointment + generateIdExterno, PublicAppointmentController POST /api/appointments, AppointmentServiceTest (+4 casos), postman | 08/05/2026 |
| SGL-025 | AG-CONF-SCREEN | AppointmentRepository#findByIdExterno, AppointmentService#getByIdExterno, PublicAppointmentController GET /{idExterno}, AgendarFlow.tsx (POST real + redirect), PasoResumen.tsx (spinner), ConfirmacionView.tsx (animaciones), confirmacion.astro | 08/05/2026 |
| SGL-026 | AG-PAGO-INST | ConfirmacionView.tsx — card datos bancarios, monto/idExterno dinámicos, botón copiar portapapeles | 08/05/2026 |
| SGL-031 + SGL-078 + SGL-100 | AG-POLICY / PAY-METHODS / LEGAL-CONSENT | PasoResumen.tsx (+badge transferencia, +política cancelación), PasoDatos.tsx (+CheckboxField, +aceptaTC/aceptaPriv) | 08/05/2026 |
| SGL-012 + SGL-013 | LP-LEGAL-TC / LP-LEGAL-PRIV | src/pages/terminos.astro, src/pages/privacidad.astro, Ley 19.628 | 08/05/2026 |
| SGL-047 | ADM-STATE (back) | AppointmentStatus.fromString, UpdateAppointmentStatusRequest, AppointmentService#updateStatus, AppointmentController PATCH /{id}/estado, AppointmentServiceTest (+4 casos), postman | 15/05/2026 |
| SGL-047 | ADM-STATE (front) | AppointmentTable.tsx (tabs), AppointmentDetail.tsx (botones según estado, PATCH, refresh) | 15/05/2026 |
| SGL-048 | PAY-MANUAL-CONF (back) | Appointment (+codigoTransaccion, montoConfirmado, fechaPago), ConfirmPaymentRequest, AppointmentService#confirmPayment, AppointmentController PATCH /{id}/pago, postman | 15/05/2026 |
| SGL-048 | PAY-MANUAL-CONF (front) | ConfirmPaymentModal.tsx, AppointmentDetail.tsx (paymentModal state) | 15/05/2026 |
| SGL-049 | ADM-CAL (back) | AppointmentCalendarDTO.java, AppointmentService#getCalendario, AppointmentController GET /calendario, postman | 15/05/2026 |
| SGL-049 | ADM-CAL (front) | src/pages/admin/calendario.astro, CalendarioAdmin.tsx, AdminLayout.astro | 15/05/2026 |
| SGL-043 | ADM-AUTH-JWT | JwtUtil.java, JwtAuthFilter.java | 08/05/2026 |
| SGL-053 | ADM-SERV-PRICE (back) | ServicePriceHistory.java, ServicePriceHistoryRepository, LegalServiceService#updatePrice, V003 SQL, postman | 15/05/2026 |
| SGL-053 | ADM-SERV-PRICE (front) | src/pages/admin/servicios.astro, ServiciosAdmin.tsx, EditPriceModal.tsx | 15/05/2026 |
| SGL-002 | LP-NAV | NavbarPublica.astro (hamburguesa móvil, drawer lateral) | 16/05/2026 |
| SGL-003 | LP-CONTACT | index.astro — sección contacto, botón WhatsApp | 16/05/2026 |
| SGL-004 | LP-RESP | index.astro — responsive corregido | 16/05/2026 |
| SGL-006 | LP-SEO-META | BaseLayout.astro — meta tags, og:*, twitter:card | 16/05/2026 |
| SGL-009 | LP-SERV-LIST | index.astro — fetch SSG /api/services, grid dinámico | 16/05/2026 |
| SGL-010 | LP-SERV-DETAIL | index.astro — details/summary expandible | 16/05/2026 |
| SGL-032 | AG-DATOS-SEC | CreateAppointmentRequest @Pattern/@Future, GlobalExceptionHandler mensajes ES | 18/05/2026 |
| SGL-056 | ADM-SEC-API | CorsConfig.java, SecurityConfig limpiado | 18/05/2026 |
| SGL-097 | SEC-RATELIMIT | bucket4j 8.13.1, RateLimitFilter.java, RateLimitFilterTest (+6 casos) | 18/05/2026 |
| SGL-098 | SEC-INPUT | owasp-java-html-sanitizer, InputSanitizer.java, InputSanitizerTest (+8 casos) | 18/05/2026 |
| SGL-033 | NOTIF-EMAIL-01 | mailtrap-java 1.2.0, EmailService.java, EmailServiceTest (+2 casos) | 18/05/2026 |
| SGL-085 | OPS-BACKUP | backup.sh, docker-compose sgl_backup, docs/procedimiento-respaldo-bbdd.md | 18/05/2026 |
| SGL-101 | ADM-LIST-PEND-2 | AppointmentTable.tsx — paginación client-side, Paginator.tsx | 21/05/2026 |
| SGL-080 | PAY-POC | transbank-sdk-java 6.1.0, TransbankConfig, WebpayController, PasoResumen.tsx, AgendarFlow.tsx | 21/05/2026 |
| SGL-029 | AG-EMAIL-CONF | EmailService — email al confirmar pago, asunto y contenido actualizados | 21/05/2026 |
| SGL-037 | NOTIF-ID | ID externo incluido en todas las notificaciones de email | 21/05/2026 |
| UI | Transiciones AppointmentTable | rowKey pattern, fade-up stagger 35ms/fila | 21/05/2026 |
| UI | Transiciones DashboardKPIs | KPICard con prop index, fade-up stagger 70ms | 21/05/2026 |
| FIX | generateIdExterno | saveAndFlush + segundo save con dbId como secuencia | 21/05/2026 |
| FIX | WebpayController fallback | resolveIdFromTbkToken antes del try/catch | 21/05/2026 |
| SGL-094 | RISK-WA-FALLBACK | Cubierto por WhatsAppService: fallos de WhatsApp no bloquean el flujo (try/catch silencioso), el agendamiento continúa con solo email como canal de notificación | 17/06/2026 |

---

## Historias R2 completadas
| ID | Alias | Archivos clave | Fecha |
|----|-------|----------------|-------|
| SGL-030 | AG-CONFLICT | AppointmentService#createAppointment (validación slot duplicado 409), AppointmentServiceTest | 05/06/2026 |
| SGL-019 | AG-DESC (back) | V004__Add_descripcion_to_appointments.sql, Appointment.java, CreateAppointmentRequest.java, AppointmentDetailDTO.java, AppointmentSummaryDTO.java, AppointmentService.java, AppointmentServiceTest (+4 casos) | 05/06/2026 |
| SGL-019 | AG-DESC (front) | PasoDatos.tsx (textarea + contador, DatosCliente#descripcion), PasoResumen.tsx (nota en resumen), AgendarFlow.tsx (descripcion en POST) | 05/06/2026 |
| SGL-050 | ADM-FILTER (back) | AppointmentSpecification.java (nuevo), AppointmentRepository (+JpaSpecificationExecutor), AppointmentService#search, AppointmentController (search/estado/desde/hasta + legacy status), AppointmentServiceTest (+8 casos), postman | 13/06/2026 |
| SGL-050 | ADM-FILTER (front) | AppointmentTable.tsx — barra de filtros (search debounce 300ms, selector estado, desde/hasta, limpiar), fetch con URLSearchParams, sincronización tabs↔selector | 13/06/2026 |
| SGL-051 | ADM-EXPORT (back) | AppointmentService#exportCsv + buildSpec (privado, compartido con search) + escapeCsv + columna Descripción, AppointmentController GET /export (text/csv, Content-Disposition), AppointmentServiceTest (+8 casos), postman | 14/06/2026 |
| SGL-051 | ADM-EXPORT (front) | AppointmentTable.tsx — botón "Exportar CSV" (estado `exporting`, spinner, fetch+blob+anchor download, filtros activos propagados) | 14/06/2026 |
| SGL-036 | NOTIF-ADMIN-NEW | EmailService#sendAdminNewAppointmentEmail + ADMIN_HTML_TEMPLATE + buildAdminHtml, AppointmentService#createAppointment (+llamada), EmailServiceTest (+3 casos), application.yml (admin.email) | 14/06/2026 |
| SGL-039 | NOTIF-TEMPL | EmailTemplateBuilder.java (nuevo, CSS compartido, wrap(), buildConfirmationEmail/buildAdminNotificationEmail/buildReminderEmail), EmailService refactorizado (delega HTML al builder), EmailTemplateBuilderTest (+8 casos) | 14/06/2026 |
| SGL-035 | NOTIF-REMIND | V005__Create_reminder_log_table.sql, ReminderTipo.java, ReminderLog.java, ReminderLogRepository.java, ReminderScheduler.java (@Scheduled cron horario), AppointmentRepository (+findByEstadoAndFecha/AndHora), EmailService (+sendReminderEmail), EmailTemplateBuilder (+buildReminder2hEmail), @EnableScheduling en SglBackendApplication, ReminderSchedulerTest (+6 casos) | 14/06/2026 |
| SGL-038 | NOTIF-RETRY | V006__Create_email_retry_queue_table.sql, TipoEmail.java, EstadoRetry.java, EmailRetryQueue.java, EmailRetryQueueRepository.java, EmailService (refactor builders + enqueueRetry + retryEmail), RetryScheduler.java (@Scheduled cada 15min), RetrySchedulerTest (+6 casos), EmailServiceTest (+3 casos) | 14/06/2026 |
| SGL-040 | NOTIF-AUDIT (back) | V007__Create_notification_log_table.sql, NotificationLog.java, NotificationLogRepository.java, NotificationLogDTO.java, NotificationLogService.java, NotificationLogController.java, EmailService (+logSuccess/logFailure en 4 métodos), NotificationLogServiceTest (+7 casos), EmailServiceTest (+7 casos) | 15/06/2026 |
| SGL-040 | NOTIF-AUDIT (front) | AppointmentDetail.tsx (sección colapsable, fetch lazy, skeleton, tabla tipo/canal/estado/fecha/error) | 15/06/2026 |
| SGL-034 | NOTIF-WA-01 | twilio 10.6.2, WhatsAppService.java, V008__Add_whatsapp_canal.sql, AppointmentService (+whatsAppService), NotificationLogService (CANAL_WHATSAPP + sobrecargas), WhatsAppServiceTest (+7 casos) | 16/06/2026 |
| SGL-028 | AG-WA-CONF | WhatsAppService#sendPaymentConfirmedWhatsApp + doSendFreeform + buildPaymentConfirmedMessage, AppointmentService#confirmPayment (+llamada), WhatsAppServiceTest (+5 casos), AppointmentServiceTest (+verify) | 17/06/2026 |
| SGL-066 | GES-OTP | V009__Create_appointment_otp_table.sql, AppointmentOtp.java, AppointmentOtpRepository.java, OtpRequest.java, OtpService.java, TipoEmail (+OTP_VERIFICACION), EmailTemplateBuilder (+buildOtpEmail), EmailService (+sendOtpEmail), PublicAppointmentController (POST /{idExterno}/request-otp), OtpServiceTest (+13 casos), EmailTemplateBuilderTest (+2 casos), EmailServiceTest (+4 casos) | 17/06/2026 |
| SGL-067 | GES-VERIFY | VerifyOtpRequest.java, VerifyOtpResponse.java, JwtUtil (+generateManagementToken/isManagementTokenValid/extractManagementIdExterno), OtpService (+verifyOtp), PublicAppointmentController (POST /{idExterno}/verify-otp), JwtUtilTest (nuevo, +8 casos), OtpServiceTest (+3 casos) | 17/06/2026 |
| SGL-068 | GES-OTP-EXP | Cubierto por SGL-066: OTP expira a los 15 min (campo expires_at), invalidación automática via query findByAppointmentIdAndOtpAndUsadoFalseAndExpiresAtAfter | 17/06/2026 |
| SGL-064 | GES-REAG-WEB | RescheduleRequest.java, RescheduleNotAllowedException.java, AppointmentService#reschedule, AppointmentRepository (+existsByFechaAndHoraAndEstadoInAndIdNot), PublicAppointmentController (PATCH /{idExterno}/reagendar), AppointmentServiceTest (+7 casos), postman (+reagendar, fix OTP {{variable}}), GestionarFlow.tsx (nuevo, flujo 6 pasos), gestionar.astro (nuevo), ConfirmacionView.tsx (+botón Reagendar) | 17/06/2026 |
| SGL-065 | GES-CANCEL-WEB | CancellationNotAllowedException.java, GlobalExceptionHandler (+handler 422), AppointmentService#cancel, PublicAppointmentController (PATCH /{idExterno}/cancelar), AppointmentServiceTest (+6 casos), postman (+cancelar), GestionarFlow.tsx (opción cancelar en paso opciones, pasos confirmar-cancelar y exito-cancelar), index.astro (texto "Gestiónala aquí") | 17/06/2026 |
| SGL-005 | LP-PERF | Cubierto por la arquitectura existente: Astro SSG (HTML estático sin JS innecesario), Tailwind v4 (CSS purgeado), Google Fonts con display=swap, imágenes lazy-load, sin librerías de animación externas | 17/06/2026 |
| SGL-071 | GES-ADMIN-REAG (back) | AppointmentService#adminReschedule (sin restricción 24h, por ID interno), AppointmentController (PATCH /{id}/reagendar), AppointmentServiceTest (+6 casos), postman (+reagendar admin) | 17/06/2026 |
| SGL-071 | GES-ADMIN-REAG (front) | RescheduleModal.tsx (nuevo, PasoFechaHora + PATCH admin), AppointmentDetail.tsx (+rescheduleModal state, +rescheduleOverlay, +botón Reagendar en footer) | 17/06/2026 |
| SGL-069 | GES-REAG-SLOT | Cubierto por SGL-064: AppointmentRepository#existsByFechaAndHoraAndEstadoInAndIdNot verifica disponibilidad del nuevo slot excluyendo la propia cita, lanza RescheduleNotAllowedException 422 si ocupado | 17/06/2026 |
| SGL-070 | GES-POLICY | Cubierto por SGL-064 y SGL-065: política 24h validada en backend (reagendar y cancelar), mensaje de política visible en paso "opciones" de GestionarFlow.tsx | 17/06/2026 |
| SGL-086 | OPS-MON | Cubierto por la arquitectura existente: Spring Boot Actuator expuesto en /api/health, logs estructurados con SLF4J/Logback, métricas de JVM disponibles vía Actuator | 17/06/2026 |
| SGL-087 | OPS-CICD | Cubierto durante el desarrollo: build Maven (./mvnw clean package), suite de tests JUnit/Mockito con cobertura JaCoCo ≥60%, TypeScript check (npx tsc --noEmit) como validación pre-commit | 17/06/2026 |
| SGL-095 | OPS-DEPLOY | Cubierto por docker-compose.yml: servicios postgres y sgl_backup declarados y funcionales; backend y frontend ejecutables con ./mvnw y npm run dev/build respectivamente | 17/06/2026 |
| SGL-099 | SEC-ENCRYPT | Cubierto por la arquitectura existente: JWT HS256 para autenticación admin, HTTPS implícito en producción vía proxy, contraseñas hasheadas con BCrypt, tokens de gestión de cliente con expiración 10 min | 17/06/2026 |
| SGL-072 | GES-ADMIN-CANCEL | CancelAppointmentModal.tsx (nuevo, confirmación con idExterno+nombre+aviso notificación, spinner, manejo de error), AppointmentDetail.tsx (import, cancelOverlay, setCancelModal state, eliminado toggle inline confirmCancel + handleChangeStatus) | 17/06/2026 |
| SGL-090 | NFR-DELETE | Cubierto por SGL-047 ADM-STATE: el admin puede cancelar cualquier agendamiento via PATCH /api/admin/appointments/{id}/estado con estado CANCELADO, equivalente funcional a eliminación lógica | 17/06/2026 |
| SGL-073 | GES-NOTIF | TipoEmail (+CANCELACION_CLIENTE, +REAGENDAMIENTO_CLIENTE), EmailTemplateBuilder (+buildCancellationEmail, +buildRescheduleEmail), EmailService (+sendCancellationEmail, +sendRescheduleEmail, +retryEmail cases), AppointmentService (cancel/reschedule/adminReschedule/updateStatus), EmailTemplateBuilderTest (+4), EmailServiceTest (+8), AppointmentServiceTest (+5) | 17/06/2026 |
| SGL-077 | WA-COMPLIANCE | Cubierto por la arquitectura existente: WhatsAppService usa Twilio Content Templates (HX...) con texto fijo aprobado por Meta, sin contenido libre generado dinámicamente; opt-in implícito al proporcionar teléfono en el agendamiento | 18/06/2026 |
| SGL-074 | WA-MENU | WhatsAppService (+sendMenuMessage, +MENU_TEXT, +menuContentSid), WhatsAppWebhookController.java (POST /api/whatsapp/webhook), SecurityConfig (+/api/whatsapp/**), application.yml (+twilio.menu-content-sid), WhatsAppServiceTest (+5 casos), WhatsAppWebhookControllerTest (nuevo, +4 casos) | 18/06/2026 |
| SGL-075 | WA-CONSULT | WhatsAppConversationState.java (nuevo enum), WhatsAppBotService.java (nuevo, estado en memoria TTL 10min, flujo "1"→ID→detalles/error), WhatsAppService (+sendBotReply), WhatsAppWebhookController (delega a WhatsAppBotService), WhatsAppBotServiceTest (nuevo, +11 casos), WhatsAppServiceTest (+3 casos), WhatsAppWebhookControllerTest (+actualizado) | 18/06/2026 |
| SGL-076 | WA-LINK | WhatsAppConversationState (+WAITING_FOR_REAGENDAR_ID, +WAITING_FOR_CANCELAR_ID), WhatsAppBotService (flujo "2"/"3"→ID→link /gestionar?id=, +frontendUrl, +MSG_REAGENDAR_LINK/CANCELAR_LINK/NOT_FOUND_MANAGEMENT), application.yml (+whatsapp.bot.frontend-url), WhatsAppBotServiceTest (+6 casos) | 18/06/2026 |
| SGL-055 | ADM-AUDIT | V013__Create_audit_log_table.sql, AuditLog.java, AuditLogRepository.java, AuditLogDTO.java, AuditPageResponse.java, AuditService.java, AuditLogController.java, AuthService/AppointmentService/LegalServiceService (+auditService wire-up), AuditServiceTest (+7 casos), AuditoriaAdmin.tsx, auditoria.astro, AdminLayout.astro (+nav link) | 19/06/2026 |

## Historias R2 en desarrollo
| ID | Alias | Estado |
|----|-------|--------|
| SGL-084 | NFR-TZ | En desarrollo |
| SGL-096 | NFR-COMPAT | En desarrollo |

## Progreso R2
- Total historias R2: 46
- Completadas: 35 (SGL-030, SGL-019, SGL-050, SGL-051, SGL-036, SGL-039, SGL-035, SGL-038, SGL-040, SGL-034, SGL-028, SGL-066, SGL-067, SGL-068, SGL-064, SGL-065, SGL-069, SGL-070, SGL-071, SGL-072, SGL-073, SGL-074, SGL-075, SGL-076, SGL-077, SGL-055, SGL-005, SGL-086, SGL-087, SGL-090, SGL-095, SGL-099)
- En desarrollo: 2
- Pendientes: 9

---

## Decisiones técnicas tomadas
| Decisión | Razón |
|----------|-------|
| Astro para frontend | SEO requerido por el cliente |
| JWT solo para admin | Clientes no tienen login |
| Twilio para WhatsApp | SDK disponible para Java |
| iText para PDF | Integración nativa con Spring Boot |
| Zona horaria: America/Santiago | Proyecto chileno, es-CL |
| `"jsx": "preserve"` en tsconfig.json | `"react-jsx"` causaba doble transformación JSX con Vite |
| `optimizeDeps.esbuildOptions.define` en astro.config.mjs | esbuild pre-bundleaba react/jsx-dev-runtime con NODE_ENV=production |
| KPIs calculados client-side (SGL-044 parcial) | Reutiliza endpoint existente sin endpoint dedicado |
| SGL-088 OPS-SONAR descartada | No se usa SonarQube en el proyecto; calidad de código cubierta por JaCoCo (cobertura mínima 60%) y revisión manual |
| DataSeeder con `@Profile("dev")` | Datos de prueba aislados del perfil producción |
| AG-CAPTCHA movida a Bloqueo/R3 | Sin Google reCAPTCHA keys disponibles |

---

## Transiciones entre pantallas / pasos

### Componente: `src/components/StepTransition.tsx`
Wrapper reutilizable para transiciones entre pasos. Sin librerías externas.

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
- Sin bounces, scales ni rotaciones
- Keyframes en `global.css`: `step-enter-forward`, `step-enter-back`

Para pantallas nuevas (no multipaso): usar `[data-animate]` + `IntersectionObserver` (patrón del `index.astro`).

---

## Convenciones de UI

### Skeletons
- Usar siempre mientras `loading === true`
- Reflejar silueta real del contenido, no spinner genérico
- Shimmer: `animation: shimmer 1.6s ease-in-out infinite` (keyframe en `global.css`)
- Referencia: `PasoServicio.tsx` → `<SkeletonCard />`

### Cards interactivas
- Hover lift: `hover:-translate-y-0.5` + `hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]`
- Seleccionado: `boxShadow: "0 0 0 2px var(--color-sgl-gold), 0 8px 32px rgba(201,168,76,0.18)"` + `border-sgl-gold`
- Barra accent superior `h-0.5` → dorada en activo, `bg-transparent` en reposo
- Badge checkmark: `scale-0 opacity-0` → `scale-100 opacity-100` con `transition-all duration-200`

### Botones con estado disabled
- No usar `disabled:opacity-*` de Tailwind v4 — no aplica consistentemente
- Usar inline style: `style={{ opacity: condicion ? 1 : 0.4, cursor: condicion ? "pointer" : "not-allowed" }}`

---

## Componentes de infraestructura
| Componente | Descripción | Activación |
|------------|-------------|-----------|
| `cl.sgl.config.DataSeeder` | 4 servicios + 10 agendamientos de prueba | `SPRING_PROFILES_ACTIVE=dev` |
| `cl.sgl.config.AdminUserInitializer` | Admin `admin@sgl.cl / admin123` | Todos excepto perfil `test` |

---

## Pendiente sin historia asignada
- Dockerfiles para `sgl_front` y `sgl_back` — necesarios para levantar el monorepo completo con `docker compose up` (relacionado con SGL-095 OPS-DEPLOY)

## Deuda técnica pendiente
- SGL-044 ADM-DASH: KPIs client-side; endpoint dedicado `/api/admin/dashboard/kpis` pendiente
- SGL-049 ADM-CAL: agendamientos CANCELADOS aparecen en el calendario — filtrar en backend con `?excluirCancelados=true`
- SGL-085 OPS-BACKUP: revisar si incluir `flyway_schema_history` en procedimiento de restauración

---

## Notas de la sesión actual
<!-- Notas temporales, borrar al cerrar sesión -->