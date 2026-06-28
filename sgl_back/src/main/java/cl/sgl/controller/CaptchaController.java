package cl.sgl.controller;

import cl.sgl.dto.ApiResponse;
import cl.sgl.dto.CaptchaVerifyRequest;
import cl.sgl.service.TurnstileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoint público de verificación anti-bots mediante Cloudflare Turnstile.
 * Sin autenticación JWT — accesible desde el formulario público de agendamiento.
 * Historia: SGL-027 AG-CAPTCHA
 */
@RestController
@RequestMapping("/api/captcha")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Captcha", description = "Verificación anti-bots con Cloudflare Turnstile")
public class CaptchaController {

    private final TurnstileService turnstileService;

    @PostMapping("/verify")
    @Operation(summary = "Verifica token Turnstile anti-bot",
               description = "Valida el token generado por el widget de Cloudflare Turnstile. " +
                             "Retorna success=true si el desafío fue resuelto por un humano.")
    public ResponseEntity<ApiResponse<Boolean>> verify(
            @RequestBody @Valid CaptchaVerifyRequest request) {

        boolean success = turnstileService.verify(request.getToken());

        String message = success
                ? "Verificación de seguridad exitosa"
                : "Verificación de seguridad fallida. Intenta nuevamente.";

        return ResponseEntity.ok(new ApiResponse<>(200, message, success));
    }
}
