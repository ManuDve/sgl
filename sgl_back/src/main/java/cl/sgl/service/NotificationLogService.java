package cl.sgl.service;

import cl.sgl.dto.NotificationLogDTO;
import cl.sgl.entity.NotificationLog;
import cl.sgl.entity.TipoEmail;
import cl.sgl.repository.NotificationLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

/**
 * Registra el resultado de cada intento de envío de email o WhatsApp.
 * Cada insert corre en su propia transacción (REQUIRES_NEW via TransactionTemplate)
 * para que un fallo de log nunca aborte la transacción principal del agendamiento.
 *
 * Historia: SGL-040 NOTIF-AUDIT
 */
@Service
@Slf4j
public class NotificationLogService {

    static final String  CANAL_EMAIL    = "EMAIL";
    static final String  CANAL_WHATSAPP = "WHATSAPP";
    static final String  ESTADO_OK      = "ENVIADO";
    static final String  ESTADO_FAIL    = "FALLIDO";
    private static final ZoneId ZONE_CL = ZoneId.of("America/Santiago");

    private final NotificationLogRepository repository;
    private final TransactionTemplate       txNew;

    public NotificationLogService(NotificationLogRepository repository,
                                  PlatformTransactionManager txManager) {
        this.repository = repository;
        this.txNew = new TransactionTemplate(txManager);
        this.txNew.setPropagationBehavior(
            org.springframework.transaction.TransactionDefinition.PROPAGATION_REQUIRES_NEW);
    }

    public void logSuccess(Long appointmentId, TipoEmail tipo, String destinatario) {
        persist(appointmentId, tipo, CANAL_EMAIL, destinatario, ESTADO_OK, null);
    }

    public void logSuccess(Long appointmentId, TipoEmail tipo, String canal, String destinatario) {
        persist(appointmentId, tipo, canal, destinatario, ESTADO_OK, null);
    }

    public void logFailure(Long appointmentId, TipoEmail tipo, String destinatario, String error) {
        persist(appointmentId, tipo, CANAL_EMAIL, destinatario, ESTADO_FAIL, error);
    }

    public void logFailure(Long appointmentId, TipoEmail tipo, String canal, String destinatario, String error) {
        persist(appointmentId, tipo, canal, destinatario, ESTADO_FAIL, error);
    }

    public List<NotificationLogDTO> findByAppointmentId(Long appointmentId) {
        return repository.findByAppointmentIdOrderByFechaEnvioDesc(appointmentId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    private void persist(Long appointmentId, TipoEmail tipo, String canal, String destinatario,
                         String estado, String error) {
        try {
            txNew.execute(status -> {
                repository.save(NotificationLog.builder()
                    .appointmentId(appointmentId)
                    .tipo(tipo)
                    .canal(canal)
                    .destinatario(destinatario)
                    .estado(estado)
                    .fechaEnvio(LocalDateTime.now(ZONE_CL))
                    .error(error)
                    .build());
                return null;
            });
        } catch (Exception e) {
            log.error("No se pudo registrar notificación — tipo={} canal={} appt={} — {}",
                tipo, canal, appointmentId, e.getMessage());
        }
    }

    private NotificationLogDTO toDTO(NotificationLog entry) {
        return NotificationLogDTO.builder()
            .id(entry.getId())
            .appointmentId(entry.getAppointmentId())
            .tipo(entry.getTipo().name())
            .canal(entry.getCanal())
            .destinatario(entry.getDestinatario())
            .estado(entry.getEstado())
            .fechaEnvio(entry.getFechaEnvio())
            .error(entry.getError())
            .build();
    }
}
