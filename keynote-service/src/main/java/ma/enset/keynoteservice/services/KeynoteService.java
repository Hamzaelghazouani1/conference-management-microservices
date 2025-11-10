package ma.enset.keynoteservice.services;

import ma.enset.keynoteservice.dtos.KeynoteDTO;
import ma.enset.keynoteservice.dtos.KeynoteRequestDTO;

import java.util.List;

public interface KeynoteService {
    
    KeynoteDTO createKeynote(KeynoteRequestDTO keynoteRequestDTO);
    
    KeynoteDTO getKeynoteById(Long id);
    
    KeynoteDTO getKeynoteByEmail(String email);
    
    List<KeynoteDTO> getAllKeynotes();
    
    List<KeynoteDTO> searchByNom(String nom);
    
    List<KeynoteDTO> searchByFonction(String fonction);
    
    KeynoteDTO updateKeynote(Long id, KeynoteRequestDTO keynoteRequestDTO);
    
    void deleteKeynote(Long id);
}

