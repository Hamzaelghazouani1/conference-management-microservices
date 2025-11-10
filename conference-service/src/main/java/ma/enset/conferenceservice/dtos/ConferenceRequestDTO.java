package ma.enset.conferenceservice.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import ma.enset.conferenceservice.entities.ConferenceType;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}

