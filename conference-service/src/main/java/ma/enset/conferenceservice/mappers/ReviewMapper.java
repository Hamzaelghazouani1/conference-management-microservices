package ma.enset.conferenceservice.mappers;

import ma.enset.conferenceservice.dtos.ReviewDTO;
import ma.enset.conferenceservice.dtos.ReviewRequestDTO;
import ma.enset.conferenceservice.entities.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    
    ReviewDTO toDTO(Review review);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "conference", ignore = true)
    @Mapping(target = "date", expression = "java(java.time.LocalDate.now())")
    Review toEntity(ReviewRequestDTO reviewRequestDTO);
    
    List<ReviewDTO> toDTOList(List<Review> reviews);
}

