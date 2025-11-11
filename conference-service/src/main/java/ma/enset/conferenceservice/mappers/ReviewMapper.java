package ma.enset.conferenceservice.mappers;

import ma.enset.conferenceservice.dtos.ReviewDTO;
import ma.enset.conferenceservice.dtos.ReviewRequestDTO;
import ma.enset.conferenceservice.entities.Review;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReviewMapper {
    
    public ReviewDTO toDTO(Review review) {
        if (review == null) return null;
        return ReviewDTO.builder()
                .id(review.getId())
                .date(review.getDate())
                .texte(review.getTexte())
                .note(review.getNote())
                .build();
    }
    
    public Review toEntity(ReviewRequestDTO dto) {
        if (dto == null) return null;
        return Review.builder()
                .date(LocalDate.now())
                .texte(dto.getTexte())
                .note(dto.getNote())
                .build();
    }
    
    public List<ReviewDTO> toDTOList(List<Review> reviews) {
        if (reviews == null) return null;
        return reviews.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
