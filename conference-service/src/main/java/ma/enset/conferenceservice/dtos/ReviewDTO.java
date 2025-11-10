package ma.enset.conferenceservice.dtos;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private Long id;
    private LocalDate date;
    private String texte;
    private Integer note;
}

