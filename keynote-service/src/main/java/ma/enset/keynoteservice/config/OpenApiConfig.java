package ma.enset.keynoteservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI keynoteServiceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Keynote Service API")
                        .description("API REST pour la gestion des intervenants (Keynotes)")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("ENSET Team")
                                .email("contact@enset.ma"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")))
                .servers(List.of(
                        new Server().url("http://localhost:8081").description("Serveur de développement"),
                        new Server().url("http://localhost:8888/keynote-service").description("Via Gateway")
                ));
    }
}

