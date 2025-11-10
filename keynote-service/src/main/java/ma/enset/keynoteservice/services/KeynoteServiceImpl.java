package ma.enset.keynoteservice.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.enset.keynoteservice.dtos.KeynoteDTO;
import ma.enset.keynoteservice.dtos.KeynoteRequestDTO;
import ma.enset.keynoteservice.entities.Keynote;
import ma.enset.keynoteservice.exceptions.KeynoteAlreadyExistsException;
import ma.enset.keynoteservice.exceptions.KeynoteNotFoundException;
import ma.enset.keynoteservice.mappers.KeynoteMapper;
import ma.enset.keynoteservice.repositories.KeynoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class KeynoteServiceImpl implements KeynoteService {
    
    private final KeynoteRepository keynoteRepository;
    private final KeynoteMapper keynoteMapper;
    
    @Override
    public KeynoteDTO createKeynote(KeynoteRequestDTO keynoteRequestDTO) {
        log.info("Creating new keynote with email: {}", keynoteRequestDTO.getEmail());
        
        if (keynoteRepository.existsByEmail(keynoteRequestDTO.getEmail())) {
            throw new KeynoteAlreadyExistsException("Un keynote avec cet email existe déjà: " + keynoteRequestDTO.getEmail());
        }
        
        Keynote keynote = keynoteMapper.toEntity(keynoteRequestDTO);
        Keynote savedKeynote = keynoteRepository.save(keynote);
        
        log.info("Keynote created successfully with id: {}", savedKeynote.getId());
        return keynoteMapper.toDTO(savedKeynote);
    }
    
    @Override
    @Transactional(readOnly = true)
    public KeynoteDTO getKeynoteById(Long id) {
        log.info("Fetching keynote with id: {}", id);
        
        Keynote keynote = keynoteRepository.findById(id)
                .orElseThrow(() -> new KeynoteNotFoundException("Keynote non trouvé avec l'id: " + id));
        
        return keynoteMapper.toDTO(keynote);
    }
    
    @Override
    @Transactional(readOnly = true)
    public KeynoteDTO getKeynoteByEmail(String email) {
        log.info("Fetching keynote with email: {}", email);
        
        Keynote keynote = keynoteRepository.findByEmail(email)
                .orElseThrow(() -> new KeynoteNotFoundException("Keynote non trouvé avec l'email: " + email));
        
        return keynoteMapper.toDTO(keynote);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<KeynoteDTO> getAllKeynotes() {
        log.info("Fetching all keynotes");
        
        List<Keynote> keynotes = keynoteRepository.findAll();
        return keynoteMapper.toDTOList(keynotes);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<KeynoteDTO> searchByNom(String nom) {
        log.info("Searching keynotes by nom: {}", nom);
        
        List<Keynote> keynotes = keynoteRepository.findByNomContainingIgnoreCase(nom);
        return keynoteMapper.toDTOList(keynotes);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<KeynoteDTO> searchByFonction(String fonction) {
        log.info("Searching keynotes by fonction: {}", fonction);
        
        List<Keynote> keynotes = keynoteRepository.findByFonctionContainingIgnoreCase(fonction);
        return keynoteMapper.toDTOList(keynotes);
    }
    
    @Override
    public KeynoteDTO updateKeynote(Long id, KeynoteRequestDTO keynoteRequestDTO) {
        log.info("Updating keynote with id: {}", id);
        
        Keynote keynote = keynoteRepository.findById(id)
                .orElseThrow(() -> new KeynoteNotFoundException("Keynote non trouvé avec l'id: " + id));
        
        // Check if email is being changed to an existing one
        if (!keynote.getEmail().equals(keynoteRequestDTO.getEmail()) 
                && keynoteRepository.existsByEmail(keynoteRequestDTO.getEmail())) {
            throw new KeynoteAlreadyExistsException("Un keynote avec cet email existe déjà: " + keynoteRequestDTO.getEmail());
        }
        
        keynoteMapper.updateEntityFromDTO(keynoteRequestDTO, keynote);
        Keynote updatedKeynote = keynoteRepository.save(keynote);
        
        log.info("Keynote updated successfully with id: {}", updatedKeynote.getId());
        return keynoteMapper.toDTO(updatedKeynote);
    }
    
    @Override
    public void deleteKeynote(Long id) {
        log.info("Deleting keynote with id: {}", id);
        
        if (!keynoteRepository.existsById(id)) {
            throw new KeynoteNotFoundException("Keynote non trouvé avec l'id: " + id);
        }
        
        keynoteRepository.deleteById(id);
        log.info("Keynote deleted successfully with id: {}", id);
    }
}

