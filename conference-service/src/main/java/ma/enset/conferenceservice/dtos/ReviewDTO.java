package ma.enset.conferenceservice.dtos;

import java.time.LocalDate;

public class ReviewDTO {
    private Long id;
    private LocalDate date;
    private String texte;
    private Integer note;
    
    public ReviewDTO() {}
    
    public ReviewDTO(Long id, LocalDate date, String texte, Integer note) {
        this.id = id;
        this.date = date;
        this.texte = texte;
        this.note = note;
    }
    
    public static ReviewDTOBuilder builder() {
        return new ReviewDTOBuilder();
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
    
    public static class ReviewDTOBuilder {
        private Long id;
        private LocalDate date;
        private String texte;
        private Integer note;
        
        public ReviewDTOBuilder id(Long id) { this.id = id; return this; }
        public ReviewDTOBuilder date(LocalDate date) { this.date = date; return this; }
        public ReviewDTOBuilder texte(String texte) { this.texte = texte; return this; }
        public ReviewDTOBuilder note(Integer note) { this.note = note; return this; }
        
        public ReviewDTO build() {
            return new ReviewDTO(id, date, texte, note);
        }
    }
}
