package ma.enset.conferenceservice.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import ma.enset.conferenceservice.entities.ConferenceType;

import java.time.LocalDate;

public class ConferenceRequestDTO {
    
    @NotBlank(message = "Le titre est obligatoire")
    private String titre;
    
    @NotNull(message = "Le type est obligatoire")
    private ConferenceType type;
    
    @NotNull(message = "La date est obligatoire")
    private LocalDate date;
    
    @Positive(message = "La durée doit être positive")
    private Integer duree;
    
    private Integer nombreInscrits;
    
    private Long keynoteId;
    
    public ConferenceRequestDTO() {}
    
    public ConferenceRequestDTO(String titre, ConferenceType type, LocalDate date, Integer duree, Integer nombreInscrits, Long keynoteId) {
        this.titre = titre;
        this.type = type;
        this.date = date;
        this.duree = duree;
        this.nombreInscrits = nombreInscrits;
        this.keynoteId = keynoteId;
    }
    
    // Getters and Setters
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
    public Long getKeynoteId() { return keynoteId; }
    public void setKeynoteId(Long keynoteId) { this.keynoteId = keynoteId; }
}
