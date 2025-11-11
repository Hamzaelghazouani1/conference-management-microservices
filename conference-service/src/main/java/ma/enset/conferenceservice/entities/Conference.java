package ma.enset.conferenceservice.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
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
    private Integer duree;
    
    private Integer nombreInscrits = 0;
    
    private Double score = 0.0;
    
    private Long keynoteId;
    
    @OneToMany(mappedBy = "conference", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();
    
    public Conference() {}
    
    public Conference(Long id, String titre, ConferenceType type, LocalDate date, Integer duree, 
                      Integer nombreInscrits, Double score, Long keynoteId, List<Review> reviews) {
        this.id = id;
        this.titre = titre;
        this.type = type;
        this.date = date;
        this.duree = duree;
        this.nombreInscrits = nombreInscrits != null ? nombreInscrits : 0;
        this.score = score != null ? score : 0.0;
        this.keynoteId = keynoteId;
        this.reviews = reviews != null ? reviews : new ArrayList<>();
    }
    
    public static ConferenceBuilder builder() {
        return new ConferenceBuilder();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public ConferenceType getType() { return type; }
    public void setType(ConferenceType type) { this.type = type; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Integer getDuree() { return duree; }
    public void setDuree(Integer duree) { this.duree = duree; }
    public Integer getNombreInscrits() { return nombreInscrits; }
    public void setNombreInscrits(Integer nombreInscrits) { this.nombreInscrits = nombreInscrits; }
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
    public Long getKeynoteId() { return keynoteId; }
    public void setKeynoteId(Long keynoteId) { this.keynoteId = keynoteId; }
    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }
    
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
    
    @Override
    public String toString() {
        return "Conference{id=" + id + ", titre='" + titre + "', type=" + type + ", date=" + date + "}";
    }
    
    public static class ConferenceBuilder {
        private Long id;
        private String titre;
        private ConferenceType type;
        private LocalDate date;
        private Integer duree;
        private Integer nombreInscrits = 0;
        private Double score = 0.0;
        private Long keynoteId;
        private List<Review> reviews = new ArrayList<>();
        
        public ConferenceBuilder id(Long id) { this.id = id; return this; }
        public ConferenceBuilder titre(String titre) { this.titre = titre; return this; }
        public ConferenceBuilder type(ConferenceType type) { this.type = type; return this; }
        public ConferenceBuilder date(LocalDate date) { this.date = date; return this; }
        public ConferenceBuilder duree(Integer duree) { this.duree = duree; return this; }
        public ConferenceBuilder nombreInscrits(Integer nombreInscrits) { this.nombreInscrits = nombreInscrits; return this; }
        public ConferenceBuilder score(Double score) { this.score = score; return this; }
        public ConferenceBuilder keynoteId(Long keynoteId) { this.keynoteId = keynoteId; return this; }
        public ConferenceBuilder reviews(List<Review> reviews) { this.reviews = reviews; return this; }
        
        public Conference build() {
            return new Conference(id, titre, type, date, duree, nombreInscrits, score, keynoteId, reviews);
        }
    }
}
