package cl.sgl.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Verifica tokens Cloudflare Turnstile contra la API siteverify.
 * Política de fallo: si el servicio no responde se rechaza el token (fail-secure).
 * Si TURNSTILE_SECRET_KEY no está configurada (entorno dev), se permite el paso con advertencia.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class TurnstileService {

    private static final String VERIFY_URL =
            "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    private final RestTemplate restTemplate;

    @Value("${turnstile.secret-key:}")
    private String secretKey;

    /**
     * Verifica que el token generado por el widget de Turnstile sea válido.
     *
     * @param token Token recibido desde el frontend
     * @return true si la verificación es exitosa, false en caso contrario
     */
    @SuppressWarnings("unchecked")
    public boolean verify(String token) {
        if (secretKey == null || secretKey.isBlank()) {
            log.warn("[Turnstile] TURNSTILE_SECRET_KEY no configurada — verificación omitida (solo dev)");
            return true;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("secret", secretKey);
            body.add("response", token);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            Map<String, Object> response = restTemplate.postForObject(
                    VERIFY_URL, request, Map.class);

            if (response == null) {
                log.warn("[Turnstile] Respuesta nula del servicio de verificación");
                return false;
            }

            boolean success = Boolean.TRUE.equals(response.get("success"));
            log.info("[Turnstile] Verificación → success={}", success);
            return success;

        } catch (HttpClientErrorException e) {
            log.error("[Turnstile] Cloudflare rechazó la solicitud ({}): {} — verifica que TURNSTILE_SECRET_KEY sea la Secret Key del dashboard, no el Site Key",
                    e.getStatusCode(), e.getResponseBodyAsString());
            return false;
        } catch (ResourceAccessException e) {
            log.error("[Turnstile] Sin conexión a Cloudflare: {}", e.getMessage());
            return false;
        } catch (Exception e) {
            log.error("[Turnstile] Error inesperado: {}", e.getMessage());
            return false;
        }
    }
}
