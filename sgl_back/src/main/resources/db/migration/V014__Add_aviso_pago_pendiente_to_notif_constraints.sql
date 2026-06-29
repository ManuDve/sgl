-- Agrega AVISO_PAGO_PENDIENTE a los constraints de notification_log y email_retry_queue.
-- El constraint puede llamarse chk_notif_tipo (local) o notification_log_tipo_check (producción).
ALTER TABLE notification_log DROP CONSTRAINT IF EXISTS chk_notif_tipo;
ALTER TABLE notification_log DROP CONSTRAINT IF EXISTS notification_log_tipo_check;
ALTER TABLE notification_log ADD CONSTRAINT chk_notif_tipo
    CHECK (tipo IN (
        'CONFIRMACION_CLIENTE',
        'NOTIF_ADMIN',
        'AVISO_PAGO_PENDIENTE',
        'REMINDER_24H',
        'REMINDER_2H',
        'OTP_VERIFICACION',
        'CANCELACION_CLIENTE',
        'REAGENDAMIENTO_CLIENTE'
    ));

ALTER TABLE email_retry_queue DROP CONSTRAINT IF EXISTS chk_retry_tipo_email;
ALTER TABLE email_retry_queue DROP CONSTRAINT IF EXISTS email_retry_queue_tipo_email_check;
ALTER TABLE email_retry_queue ADD CONSTRAINT chk_retry_tipo_email
    CHECK (tipo_email IN (
        'CONFIRMACION_CLIENTE',
        'NOTIF_ADMIN',
        'AVISO_PAGO_PENDIENTE',
        'REMINDER_24H',
        'REMINDER_2H',
        'OTP_VERIFICACION',
        'CANCELACION_CLIENTE',
        'REAGENDAMIENTO_CLIENTE'
    ));
