package ma.enset.conferenceservice.mappers;

import ma.enset.conferenceservice.dtos.ConferenceDTO;
import ma.enset.conferenceservice.dtos.ConferenceRequestDTO;
import ma.enset.conferenceservice.entities.Conference;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ConferenceMapper {
    
    private final ReviewMapper reviewMapper;
    
    public ConferenceMapper(ReviewMapper reviewMapper) {
        this.reviewMapper = reviewMapper;
    }
    
    public ConferenceDTO toDTO(Conference conference) {
        if (conference == null) return null;
        return ConferenceDTO.builder()
                .id(conference.getId())
                .titre(conference.getTitre())
                .type(conference.getType())
                .date(conference.getDate())
                .duree(conference.getDuree())
                .nombreInscrits(conference.getNombreInscrits())
                .score(conference.getScore())
                .keynoteId(conference.getKeynoteId())
                .reviews(reviewMapper.toDTOList(conference.getReviews()))
                .build();
    }
    
    public Conference toEntity(ConferenceDTO dto) {
        if (dto == null) return null;
        return Conference.builder()
                .id(dto.getId())
                .titre(dto.getTitre())
                .type(dto.getType())
                .date(dto.getDate())
                .duree(dto.getDuree())
                .nombreInscrits(dto.getNombreInscrits())
                .score(dto.getScore())
                .keynoteId(dto.getKeynoteId())
                .build();
    }
    
    public Conference toEntity(ConferenceRequestDTO dto) {
        if (dto == null) return null;
        return Conference.builder()
                .titre(dto.getTitre())
                .type(dto.getType())
                .date(dto.getDate())
                .duree(dto.getDuree())
                .nombreInscrits(dto.getNombreInscrits() != null ? dto.getNombreInscrits() : 0)
                .keynoteId(dto.getKeynoteId())
                .build();
    }
    
    public List<ConferenceDTO> toDTOList(List<Conference> conferences) {
        if (conferences == null) return null;
        return conferences.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public void updateEntityFromDTO(ConferenceRequestDTO dto, Conference entity) {
        if (dto == null || entity == null) return;
        entity.setTitre(dto.getTitre());
        entity.setType(dto.getType());
        entity.setDate(dto.getDate());
        entity.setDuree(dto.getDuree());
        entity.setNombreInscrits(dto.getNombreInscrits() != null ? dto.getNombreInscrits() : entity.getNombreInscrits());
        entity.setKeynoteId(dto.getKeynoteId());
    }
}
