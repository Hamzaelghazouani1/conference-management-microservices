package ma.enset.keynoteservice.mappers;

import ma.enset.keynoteservice.dtos.KeynoteDTO;
import ma.enset.keynoteservice.dtos.KeynoteRequestDTO;
import ma.enset.keynoteservice.entities.Keynote;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class KeynoteMapper {
    
    public KeynoteDTO toDTO(Keynote keynote) {
        if (keynote == null) return null;
        return KeynoteDTO.builder()
                .id(keynote.getId())
                .nom(keynote.getNom())
                .prenom(keynote.getPrenom())
                .email(keynote.getEmail())
                .fonction(keynote.getFonction())
                .build();
    }
    
    public Keynote toEntity(KeynoteDTO keynoteDTO) {
        if (keynoteDTO == null) return null;
        return Keynote.builder()
                .id(keynoteDTO.getId())
                .nom(keynoteDTO.getNom())
                .prenom(keynoteDTO.getPrenom())
                .email(keynoteDTO.getEmail())
                .fonction(keynoteDTO.getFonction())
                .build();
    }
    
    public Keynote toEntity(KeynoteRequestDTO dto) {
        if (dto == null) return null;
        return Keynote.builder()
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .email(dto.getEmail())
                .fonction(dto.getFonction())
                .build();
    }
    
    public List<KeynoteDTO> toDTOList(List<Keynote> keynotes) {
        if (keynotes == null) return null;
        return keynotes.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public void updateEntityFromDTO(KeynoteRequestDTO dto, Keynote entity) {
        if (dto == null || entity == null) return;
        entity.setNom(dto.getNom());
        entity.setPrenom(dto.getPrenom());
        entity.setEmail(dto.getEmail());
        entity.setFonction(dto.getFonction());
    }
}
