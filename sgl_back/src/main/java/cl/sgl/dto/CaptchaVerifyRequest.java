package cl.sgl.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CaptchaVerifyRequest {

    @NotBlank(message = "El token de captcha es obligatorio")
    private String token;
}
