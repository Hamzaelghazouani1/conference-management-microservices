package ma.enset.conferenceservice.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "reviews")
public class Conference {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Le titre est obligatoire")
    private String titre;
    
    @NotNull(message = "Le type est obligatoire")
    @Enumerated(EnumType.STRING)
    private ConferenceType type;
    
    @NotNull(message = "La date est obligatoire")
    private LocalDate date;
    
    @Positive(message = "La durée doit être positive")
    private Integer duree; // en minutes
    
    @Builder.Default
    private Integer nombreInscrits = 0;
    
    @Builder.Default
    private Double score = 0.0;
    
    private Long keynoteId;
    
    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Review> reviews = new ArrayList<>();
    
    public void addReview(Review review) {
        reviews.add(review);
        review.setConference(this);
        calculateScore();
    }
    
    public void removeReview(Review review) {
        reviews.remove(review);
        review.setConference(null);
        calculateScore();
    }
    
    public void calculateScore() {
        if (reviews != null && !reviews.isEmpty()) {
            this.score = reviews.stream()
                    .mapToInt(Review::getNote)
                    .average()
                    .orElse(0.0);
        } else {
            this.score = 0.0;
        }
    }
}

