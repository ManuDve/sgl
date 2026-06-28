package cl.sgl.config;

import cl.sgl.entity.AdminUser;
import cl.sgl.repository.AdminUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Inicializa el admin por defecto si no existe.
 * La contraseña se lee desde ADMIN_PASSWORD; si no está definida,
 * usa "admin123" solo en perfil dev (log ERROR en cualquier otro perfil).
 */
@Component
@Profile("!test")
@Slf4j
public class AdminUserInitializer implements CommandLineRunner {

    private static final String DEFAULT_EMAIL    = "admin@sgl.cl";
    private static final String DEFAULT_PASSWORD = "admin123";

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder     passwordEncoder;
    private final Environment         environment;

    @Value("${ADMIN_PASSWORD:#{null}}")
    private String adminPassword;

    public AdminUserInitializer(AdminUserRepository adminUserRepository,
                                PasswordEncoder passwordEncoder,
                                Environment environment) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder     = passwordEncoder;
        this.environment         = environment;
    }

    @Override
    public void run(String... args) {
        if (adminUserRepository.existsByEmail(DEFAULT_EMAIL)) {
            return;
        }

        String password = resolvePassword();

        AdminUser adminUser = AdminUser.builder()
            .email(DEFAULT_EMAIL)
            .password(passwordEncoder.encode(password))
            .role("ADMIN")
            .build();

        adminUserRepository.save(adminUser);
        log.info("[AdminUserInitializer] Admin creado: {}", DEFAULT_EMAIL);
    }

    private String resolvePassword() {
        if (adminPassword != null && !adminPassword.isBlank()) {
            return adminPassword;
        }

        boolean isDev = Arrays.asList(environment.getActiveProfiles()).contains("dev");
        if (isDev) {
            log.info("[AdminUserInitializer] ADMIN_PASSWORD no configurada — usando contraseña por defecto (perfil dev)");
            return DEFAULT_PASSWORD;
        }

        log.error("[AdminUserInitializer] ADMIN_PASSWORD no está configurada en un perfil de producción. " +
                  "Se usará la contraseña por defecto. Configura ADMIN_PASSWORD antes de exponer el servicio.");
        return DEFAULT_PASSWORD;
    }
}
