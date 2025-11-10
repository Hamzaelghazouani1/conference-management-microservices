package ma.enset.keynoteservice;

import ma.enset.keynoteservice.entities.Keynote;
import ma.enset.keynoteservice.repositories.KeynoteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class KeynoteServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(KeynoteServiceApplication.class, args);
    }
    
    @Bean
    CommandLineRunner initData(KeynoteRepository keynoteRepository) {
        return args -> {
            // Données de test
            keynoteRepository.save(Keynote.builder()
                    .nom("Martin")
                    .prenom("Jean")
                    .email("jean.martin@email.com")
                    .fonction("Professeur en Intelligence Artificielle")
                    .build());
            
            keynoteRepository.save(Keynote.builder()
                    .nom("Dupont")
                    .prenom("Marie")
                    .email("marie.dupont@email.com")
                    .fonction("Directrice de Recherche")
                    .build());
            
            keynoteRepository.save(Keynote.builder()
                    .nom("Bernard")
                    .prenom("Pierre")
                    .email("pierre.bernard@email.com")
                    .fonction("Expert en Cloud Computing")
                    .build());
            
            keynoteRepository.save(Keynote.builder()
                    .nom("Leroy")
                    .prenom("Sophie")
                    .email("sophie.leroy@email.com")
                    .fonction("Architecte Solutions")
                    .build());
            
            keynoteRepository.save(Keynote.builder()
                    .nom("Moreau")
                    .prenom("Lucas")
                    .email("lucas.moreau@email.com")
                    .fonction("Consultant DevOps")
                    .build());
        };
    }
}
