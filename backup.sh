#!/bin/sh
# SGL — Script de respaldo de base de datos PostgreSQL
# Ejecutado automáticamente por el servicio sgl_backup vía cron (02:00 America/Santiago).
# Historia: SGL-085 OPS-BACKUP

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")
BACKUP_DIR="/backups"
BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"
RETENTION_DAYS=7

mkdir -p "${BACKUP_DIR}"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Iniciando respaldo → ${BACKUP_FILE}"

PGPASSWORD="${POSTGRES_PASSWORD}" pg_dump \
  -h postgres \
  -U "${POSTGRES_USER}" \
  -d "${POSTGRES_DB}" \
  --no-password \
  --format=plain \
  --no-owner \
  --no-privileges \
  > "${BACKUP_FILE}"

if [ $? -eq 0 ]; then
  SIZE=$(du -sh "${BACKUP_FILE}" | cut -f1)
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Respaldo completado: ${BACKUP_FILE} (${SIZE})"
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: pg_dump falló. Revisa la conexión a postgres."
  rm -f "${BACKUP_FILE}"
  exit 1
fi

# Eliminar respaldos con más de RETENTION_DAYS días
DELETED=$(find "${BACKUP_DIR}" -name "backup_*.sql" -mtime +${RETENTION_DAYS} -print)
find "${BACKUP_DIR}" -name "backup_*.sql" -mtime +${RETENTION_DAYS} -delete

if [ -n "${DELETED}" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Limpieza: archivos eliminados por retención (>${RETENTION_DAYS} días):"
  echo "${DELETED}"
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Limpieza: no hay archivos que superen ${RETENTION_DAYS} días."
fi
