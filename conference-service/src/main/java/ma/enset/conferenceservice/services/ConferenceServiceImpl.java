package ma.enset.conferenceservice.services;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import ma.enset.conferenceservice.clients.KeynoteRestClient;
import ma.enset.conferenceservice.dtos.*;
import ma.enset.conferenceservice.entities.Conference;
import ma.enset.conferenceservice.entities.ConferenceType;
import ma.enset.conferenceservice.entities.Review;
import ma.enset.conferenceservice.exceptions.ConferenceNotFoundException;
import ma.enset.conferenceservice.exceptions.ReviewNotFoundException;
import ma.enset.conferenceservice.mappers.ConferenceMapper;
import ma.enset.conferenceservice.mappers.ReviewMapper;
import ma.enset.conferenceservice.repositories.ConferenceRepository;
import ma.enset.conferenceservice.repositories.ReviewRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ConferenceServiceImpl implements ConferenceService {
    
    private static final Logger log = LoggerFactory.getLogger(ConferenceServiceImpl.class);
    
    private final ConferenceRepository conferenceRepository;
    private final ReviewRepository reviewRepository;
    private final ConferenceMapper conferenceMapper;
    private final ReviewMapper reviewMapper;
    private final KeynoteRestClient keynoteRestClient;
    
    public ConferenceServiceImpl(ConferenceRepository conferenceRepository, ReviewRepository reviewRepository,
                                  ConferenceMapper conferenceMapper, ReviewMapper reviewMapper,
                                  KeynoteRestClient keynoteRestClient) {
        this.conferenceRepository = conferenceRepository;
        this.reviewRepository = reviewRepository;
        this.conferenceMapper = conferenceMapper;
        this.reviewMapper = reviewMapper;
        this.keynoteRestClient = keynoteRestClient;
    }
    
    @Override
    public ConferenceDTO createConference(ConferenceRequestDTO conferenceRequestDTO) {
        log.info("Creating new conference: {}", conferenceRequestDTO.getTitre());
        
        Conference conference = conferenceMapper.toEntity(conferenceRequestDTO);
        if (conferenceRequestDTO.getNombreInscrits() == null) {
            conference.setNombreInscrits(0);
        }
        Conference savedConference = conferenceRepository.save(conference);
        
        log.info("Conference created with id: {}", savedConference.getId());
        return enrichWithKeynote(conferenceMapper.toDTO(savedConference));
    }
    
    @Override
    @Transactional(readOnly = true)
    public ConferenceDTO getConferenceById(Long id) {
        log.info("Fetching conference with id: {}", id);
        
        Conference conference = conferenceRepository.findById(id)
                .orElseThrow(() -> new ConferenceNotFoundException("Conférence non trouvée avec l'id: " + id));
        
        return enrichWithKeynote(conferenceMapper.toDTO(conference));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ConferenceDTO> getAllConferences() {
        log.info("Fetching all conferences");
        
        List<Conference> conferences = conferenceRepository.findAll();
        return conferences.stream()
                .map(conferenceMapper::toDTO)
                .map(this::enrichWithKeynote)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ConferenceDTO> getConferencesByType(ConferenceType type) {
        log.info("Fetching conferences by type: {}", type);
        
        List<Conference> conferences = conferenceRepository.findByType(type);
        return conferences.stream()
                .map(conferenceMapper::toDTO)
                .map(this::enrichWithKeynote)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ConferenceDTO> getConferencesByKeynoteId(Long keynoteId) {
        log.info("Fetching conferences by keynote id: {}", keynoteId);
        
        List<Conference> conferences = conferenceRepository.findByKeynoteId(keynoteId);
        return conferences.stream()
                .map(conferenceMapper::toDTO)
                .map(this::enrichWithKeynote)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ConferenceDTO> getConferencesByDateRange(LocalDate startDate, LocalDate endDate) {
        log.info("Fetching conferences between {} and {}", startDate, endDate);
        
        List<Conference> conferences = conferenceRepository.findByDateBetween(startDate, endDate);
        return conferences.stream()
                .map(conferenceMapper::toDTO)
                .map(this::enrichWithKeynote)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ConferenceDTO> searchByTitre(String titre) {
        log.info("Searching conferences by titre: {}", titre);
        
        List<Conference> conferences = conferenceRepository.findByTitreContainingIgnoreCase(titre);
        return conferences.stream()
                .map(conferenceMapper::toDTO)
                .map(this::enrichWithKeynote)
                .toList();
    }
    
    @Override
    public ConferenceDTO updateConference(Long id, ConferenceRequestDTO conferenceRequestDTO) {
        log.info("Updating conference with id: {}", id);
        
        Conference conference = conferenceRepository.findById(id)
                .orElseThrow(() -> new ConferenceNotFoundException("Conférence non trouvée avec l'id: " + id));
        
        conferenceMapper.updateEntityFromDTO(conferenceRequestDTO, conference);
        Conference updatedConference = conferenceRepository.save(conference);
        
        log.info("Conference updated with id: {}", updatedConference.getId());
        return enrichWithKeynote(conferenceMapper.toDTO(updatedConference));
    }
    
    @Override
    public void deleteConference(Long id) {
        log.info("Deleting conference with id: {}", id);
        
        if (!conferenceRepository.existsById(id)) {
            throw new ConferenceNotFoundException("Conférence non trouvée avec l'id: " + id);
        }
        
        conferenceRepository.deleteById(id);
        log.info("Conference deleted with id: {}", id);
    }
    
    @Override
    public ConferenceDTO addReview(Long conferenceId, ReviewRequestDTO reviewRequestDTO) {
        log.info("Adding review to conference with id: {}", conferenceId);
        
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new ConferenceNotFoundException("Conférence non trouvée avec l'id: " + conferenceId));
        
        Review review = reviewMapper.toEntity(reviewRequestDTO);
        conference.addReview(review);
        
        Conference savedConference = conferenceRepository.save(conference);
        
        log.info("Review added to conference with id: {}", conferenceId);
        return enrichWithKeynote(conferenceMapper.toDTO(savedConference));
    }
    
    @Override
    public void deleteReview(Long conferenceId, Long reviewId) {
        log.info("Deleting review {} from conference {}", reviewId, conferenceId);
        
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new ConferenceNotFoundException("Conférence non trouvée avec l'id: " + conferenceId));
        
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFoundException("Review non trouvée avec l'id: " + reviewId));
        
        conference.removeReview(review);
        conferenceRepository.save(conference);
        
        log.info("Review deleted from conference");
    }
    
    @CircuitBreaker(name = "keynoteService", fallbackMethod = "getDefaultKeynote")
    private ConferenceDTO enrichWithKeynote(ConferenceDTO conferenceDTO) {
        if (conferenceDTO.getKeynoteId() != null) {
            try {
                KeynoteDTO keynote = keynoteRestClient.findKeynoteById(conferenceDTO.getKeynoteId());
                conferenceDTO.setKeynote(keynote);
            } catch (Exception e) {
                log.warn("Failed to fetch keynote for conference {}: {}", conferenceDTO.getId(), e.getMessage());
                conferenceDTO.setKeynote(getDefaultKeynoteDTO());
            }
        }
        return conferenceDTO;
    }
    
    private ConferenceDTO getDefaultKeynote(ConferenceDTO conferenceDTO, Throwable throwable) {
        log.warn("Circuit breaker fallback triggered for keynote service: {}", throwable.getMessage());
        conferenceDTO.setKeynote(getDefaultKeynoteDTO());
        return conferenceDTO;
    }
    
    private KeynoteDTO getDefaultKeynoteDTO() {
        return KeynoteDTO.builder()
                .id(0L)
                .nom("Service")
                .prenom("Indisponible")
                .email("unavailable@service.com")
                .fonction("Service temporairement indisponible")
                .build();
    }
}
