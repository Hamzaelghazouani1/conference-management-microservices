package ma.enset.keynoteservice.mappers;

import ma.enset.keynoteservice.dtos.KeynoteDTO;
import ma.enset.keynoteservice.dtos.KeynoteRequestDTO;
import ma.enset.keynoteservice.entities.Keynote;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface KeynoteMapper {
    
    KeynoteDTO toDTO(Keynote keynote);
    
    Keynote toEntity(KeynoteDTO keynoteDTO);
    
    Keynote toEntity(KeynoteRequestDTO keynoteRequestDTO);
    
    List<KeynoteDTO> toDTOList(List<Keynote> keynotes);
    
    void updateEntityFromDTO(KeynoteRequestDTO dto, @MappingTarget Keynote entity);
}

