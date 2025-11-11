package ma.enset.conferenceservice.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "La date est obligatoire")
    private LocalDate date;
    
    @NotBlank(message = "Le texte est obligatoire")
    @Column(length = 1000)
    private String texte;
    
    @Min(value = 1, message = "La note minimum est 1")
    @Max(value = 5, message = "La note maximum est 5")
    private Integer note;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id")
    private Conference conference;
    
    public Review() {}
    
    public Review(Long id, LocalDate date, String texte, Integer note, Conference conference) {
        this.id = id;
        this.date = date;
        this.texte = texte;
        this.note = note;
        this.conference = conference;
    }
    
    public static ReviewBuilder builder() {
        return new ReviewBuilder();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getTexte() { return texte; }
    public void setTexte(String texte) { this.texte = texte; }
    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }
    public Conference getConference() { return conference; }
    public void setConference(Conference conference) { this.conference = conference; }
    
    @Override
    public String toString() {
        return "Review{id=" + id + ", date=" + date + ", note=" + note + "}";
    }
    
    public static class ReviewBuilder {
        private Long id;
        private LocalDate date;
        private String texte;
        private Integer note;
        private Conference conference;
        
        public ReviewBuilder id(Long id) { this.id = id; return this; }
        public ReviewBuilder date(LocalDate date) { this.date = date; return this; }
        public ReviewBuilder texte(String texte) { this.texte = texte; return this; }
        public ReviewBuilder note(Integer note) { this.note = note; return this; }
        public ReviewBuilder conference(Conference conference) { this.conference = conference; return this; }
        
        public Review build() {
            return new Review(id, date, texte, note, conference);
        }
    }
}
