package ma.enset.conferenceservice;

import ma.enset.conferenceservice.entities.Conference;
import ma.enset.conferenceservice.entities.ConferenceType;
import ma.enset.conferenceservice.entities.Review;
import ma.enset.conferenceservice.repositories.ConferenceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class ConferenceServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ConferenceServiceApplication.class, args);
    }
    
    @Bean
    CommandLineRunner initData(ConferenceRepository conferenceRepository) {
        return args -> {
            // Conférence 1 avec reviews
            Conference conf1 = Conference.builder()
                    .titre("Introduction à l'Intelligence Artificielle")
                    .type(ConferenceType.ACADEMIQUE)
                    .date(LocalDate.of(2025, 1, 15))
                    .duree(120)
                    .nombreInscrits(150)
                    .keynoteId(1L)
                    .build();
            
            conf1.addReview(Review.builder()
                    .date(LocalDate.now())
                    .texte("Excellente présentation, très instructive!")
                    .note(5)
                    .build());
            
            conf1.addReview(Review.builder()
                    .date(LocalDate.now())
                    .texte("Bon contenu mais un peu technique pour les débutants")
                    .note(4)
                    .build());
            
            conferenceRepository.save(conf1);
            
            // Conférence 2
            Conference conf2 = Conference.builder()
                    .titre("Cloud Computing et DevOps")
                    .type(ConferenceType.COMMERCIALE)
                    .date(LocalDate.of(2025, 2, 20))
                    .duree(90)
                    .nombreInscrits(200)
                    .keynoteId(3L)
                    .build();
            
            conf2.addReview(Review.builder()
                    .date(LocalDate.now())
                    .texte("Très pratique et applicable immédiatement")
                    .note(5)
                    .build());
            
            conferenceRepository.save(conf2);
            
            // Conférence 3
            Conference conf3 = Conference.builder()
                    .titre("Architecture Microservices avec Spring Boot")
                    .type(ConferenceType.ACADEMIQUE)
                    .date(LocalDate.of(2025, 3, 10))
                    .duree(180)
                    .nombreInscrits(120)
                    .keynoteId(4L)
                    .build();
            
            conf3.addReview(Review.builder()
                    .date(LocalDate.now())
                    .texte("Contenu riche et bien structuré")
                    .note(4)
                    .build());
            
            conf3.addReview(Review.builder()
                    .date(LocalDate.now())
                    .texte("J'aurais aimé plus de démos pratiques")
                    .note(3)
                    .build());
            
            conferenceRepository.save(conf3);
            
            // Conférence 4
            Conference conf4 = Conference.builder()
                    .titre("Sécurité des Applications Web")
                    .type(ConferenceType.COMMERCIALE)
                    .date(LocalDate.of(2025, 4, 5))
                    .duree(150)
                    .nombreInscrits(180)
                    .keynoteId(2L)
                    .build();
            
            conferenceRepository.save(conf4);
            
            // Conférence 5
            Conference conf5 = Conference.builder()
                    .titre("Machine Learning en Production")
                    .type(ConferenceType.ACADEMIQUE)
                    .date(LocalDate.of(2025, 5, 15))
                    .duree(120)
                    .nombreInscrits(100)
                    .keynoteId(1L)
                    .build();
            
            conferenceRepository.save(conf5);
        };
    }
}
