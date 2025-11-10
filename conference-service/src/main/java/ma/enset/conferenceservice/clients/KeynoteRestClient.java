package ma.enset.conferenceservice.clients;

import ma.enset.conferenceservice.dtos.KeynoteDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "KEYNOTE-SERVICE")
public interface KeynoteRestClient {
    
    @GetMapping("/api/keynotes/{id}")
    KeynoteDTO findKeynoteById(@PathVariable("id") Long id);
    
    @GetMapping("/api/keynotes")
    List<KeynoteDTO> findAllKeynotes();
}

