package ma.enset.conferenceservice.dtos;

import ma.enset.conferenceservice.entities.ConferenceType;

import java.time.LocalDate;
import java.util.List;

public class ConferenceDTO {
    private Long id;
    private String titre;
    private ConferenceType type;
    private LocalDate date;
    private Integer duree;
    private Integer nombreInscrits;
    private Double score;
    private Long keynoteId;
    private KeynoteDTO keynote;
    private List<ReviewDTO> reviews;
    
    public ConferenceDTO() {}
    
    public ConferenceDTO(Long id, String titre, ConferenceType type, LocalDate date, Integer duree,
                         Integer nombreInscrits, Double score, Long keynoteId, KeynoteDTO keynote, List<ReviewDTO> reviews) {
        this.id = id;
        this.titre = titre;
        this.type = type;
        this.date = date;
        this.duree = duree;
        this.nombreInscrits = nombreInscrits;
        this.score = score;
        this.keynoteId = keynoteId;
        this.keynote = keynote;
        this.reviews = reviews;
    }
    
    public static ConferenceDTOBuilder builder() {
        return new ConferenceDTOBuilder();
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
    public KeynoteDTO getKeynote() { return keynote; }
    public void setKeynote(KeynoteDTO keynote) { this.keynote = keynote; }
    public List<ReviewDTO> getReviews() { return reviews; }
    public void setReviews(List<ReviewDTO> reviews) { this.reviews = reviews; }
    
    public static class ConferenceDTOBuilder {
        private Long id;
        private String titre;
        private ConferenceType type;
        private LocalDate date;
        private Integer duree;
        private Integer nombreInscrits;
        private Double score;
        private Long keynoteId;
        private KeynoteDTO keynote;
        private List<ReviewDTO> reviews;
        
        public ConferenceDTOBuilder id(Long id) { this.id = id; return this; }
        public ConferenceDTOBuilder titre(String titre) { this.titre = titre; return this; }
        public ConferenceDTOBuilder type(ConferenceType type) { this.type = type; return this; }
        public ConferenceDTOBuilder date(LocalDate date) { this.date = date; return this; }
        public ConferenceDTOBuilder duree(Integer duree) { this.duree = duree; return this; }
        public ConferenceDTOBuilder nombreInscrits(Integer nombreInscrits) { this.nombreInscrits = nombreInscrits; return this; }
        public ConferenceDTOBuilder score(Double score) { this.score = score; return this; }
        public ConferenceDTOBuilder keynoteId(Long keynoteId) { this.keynoteId = keynoteId; return this; }
        public ConferenceDTOBuilder keynote(KeynoteDTO keynote) { this.keynote = keynote; return this; }
        public ConferenceDTOBuilder reviews(List<ReviewDTO> reviews) { this.reviews = reviews; return this; }
        
        public ConferenceDTO build() {
            return new ConferenceDTO(id, titre, type, date, duree, nombreInscrits, score, keynoteId, keynote, reviews);
        }
    }
}
