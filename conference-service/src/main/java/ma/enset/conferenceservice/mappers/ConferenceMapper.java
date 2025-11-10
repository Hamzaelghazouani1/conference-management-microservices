package ma.enset.conferenceservice.mappers;

import ma.enset.conferenceservice.dtos.ConferenceDTO;
import ma.enset.conferenceservice.dtos.ConferenceRequestDTO;
import ma.enset.conferenceservice.entities.Conference;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ReviewMapper.class})
public interface ConferenceMapper {
    
    @Mapping(target = "keynote", ignore = true)
    ConferenceDTO toDTO(Conference conference);
    
    Conference toEntity(ConferenceDTO conferenceDTO);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "score", ignore = true)
    Conference toEntity(ConferenceRequestDTO conferenceRequestDTO);
    
    List<ConferenceDTO> toDTOList(List<Conference> conferences);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "score", ignore = true)
    void updateEntityFromDTO(ConferenceRequestDTO dto, @MappingTarget Conference entity);
}

