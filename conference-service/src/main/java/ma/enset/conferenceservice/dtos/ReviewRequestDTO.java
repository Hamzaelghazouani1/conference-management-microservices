package ma.enset.conferenceservice.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ReviewRequestDTO {
    
    @NotBlank(message = "Le texte est obligatoire")
    private String texte;
    
    @Min(value = 1, message = "La note minimum est 1")
    @Max(value = 5, message = "La note maximum est 5")
    private Integer note;
    
    public ReviewRequestDTO() {}
    
    public ReviewRequestDTO(String texte, Integer note) {
        this.texte = texte;
        this.note = note;
    }
    
    // Getters and Setters
    public String getTexte() { return texte; }
    public void setTexte(String texte) { this.texte = texte; }
    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }
}
