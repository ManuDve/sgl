package cl.sgl.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TurnstileServiceTest {

    private static final String VERIFY_URL =
            "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private TurnstileService turnstileService;

    @BeforeEach
    void setup() {
        ReflectionTestUtils.setField(turnstileService, "secretKey", "test-secret-key");
    }

    @Test
    void testVerifyCaptcha_TokenValidoCloudflareRetornaTrue_DevuelveTrue() {
        when(restTemplate.postForObject(eq(VERIFY_URL), any(HttpEntity.class), eq(Map.class)))
                .thenReturn(Map.of("success", true));

        boolean result = turnstileService.verify("token-valido");

        assertThat(result).isTrue();
    }

    @Test
    void testVerifyCaptcha_TokenInvalidoCloudflareRetornaFalse_DevuelveFalse() {
        when(restTemplate.postForObject(eq(VERIFY_URL), any(HttpEntity.class), eq(Map.class)))
                .thenReturn(Map.of("success", false, "error-codes", java.util.List.of("invalid-input-response")));

        boolean result = turnstileService.verify("token-invalido");

        assertThat(result).isFalse();
    }

    @Test
    void testVerifyCaptcha_ErrorRedCloudflare_DevuelveFalse() {
        when(restTemplate.postForObject(eq(VERIFY_URL), any(HttpEntity.class), eq(Map.class)))
                .thenThrow(new ResourceAccessException("Connection refused"));

        boolean result = turnstileService.verify("token-cualquiera");

        assertThat(result).isFalse();
    }

    @Test
    void testVerifyCaptcha_RespuestaNulaCloudflare_DevuelveFalse() {
        when(restTemplate.postForObject(eq(VERIFY_URL), any(HttpEntity.class), eq(Map.class)))
                .thenReturn(null);

        boolean result = turnstileService.verify("token-cualquiera");

        assertThat(result).isFalse();
    }

    @Test
    void testVerifyCaptcha_SinClaveConfigrada_DevuelveTrueSinLlamarCloudflare() {
        ReflectionTestUtils.setField(turnstileService, "secretKey", "");

        boolean result = turnstileService.verify("token-cualquiera");

        assertThat(result).isTrue();
        verify(restTemplate, never()).postForObject(any(), any(), any());
    }
}
