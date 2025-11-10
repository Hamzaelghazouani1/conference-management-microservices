package ma.enset.conferenceservice.services;

import ma.enset.conferenceservice.dtos.ConferenceDTO;
import ma.enset.conferenceservice.dtos.ConferenceRequestDTO;
import ma.enset.conferenceservice.dtos.ReviewRequestDTO;
import ma.enset.conferenceservice.entities.ConferenceType;

import java.time.LocalDate;
import java.util.List;

public interface ConferenceService {
    
    ConferenceDTO createConference(ConferenceRequestDTO conferenceRequestDTO);
    
    ConferenceDTO getConferenceById(Long id);
    
    List<ConferenceDTO> getAllConferences();
    
    List<ConferenceDTO> getConferencesByType(ConferenceType type);
    
    List<ConferenceDTO> getConferencesByKeynoteId(Long keynoteId);
    
    List<ConferenceDTO> getConferencesByDateRange(LocalDate startDate, LocalDate endDate);
    
    List<ConferenceDTO> searchByTitre(String titre);
    
    ConferenceDTO updateConference(Long id, ConferenceRequestDTO conferenceRequestDTO);
    
    void deleteConference(Long id);
    
    ConferenceDTO addReview(Long conferenceId, ReviewRequestDTO reviewRequestDTO);
    
    void deleteReview(Long conferenceId, Long reviewId);
}

