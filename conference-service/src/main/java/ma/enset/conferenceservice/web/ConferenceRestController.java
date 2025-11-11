package ma.enset.conferenceservice.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import ma.enset.conferenceservice.dtos.ConferenceDTO;
import ma.enset.conferenceservice.dtos.ConferenceRequestDTO;
import ma.enset.conferenceservice.dtos.ReviewRequestDTO;
import ma.enset.conferenceservice.entities.ConferenceType;
import ma.enset.conferenceservice.services.ConferenceService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/conferences")
@Tag(name = "Conference Management", description = "APIs pour la gestion des conférences")
public class ConferenceRestController {
    
    private final ConferenceService conferenceService;
    
    public ConferenceRestController(ConferenceService conferenceService) {
        this.conferenceService = conferenceService;
    }
    
    @PostMapping
    @Operation(summary = "Créer une nouvelle conférence", description = "Crée une nouvelle conférence dans le système")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Conférence créée avec succès"),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public ResponseEntity<ConferenceDTO> createConference(@Valid @RequestBody ConferenceRequestDTO conferenceRequestDTO) {
        ConferenceDTO createdConference = conferenceService.createConference(conferenceRequestDTO);
        return new ResponseEntity<>(createdConference, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtenir une conférence par ID", description = "Récupère les détails d'une conférence par son identifiant")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conférence trouvée"),
            @ApiResponse(responseCode = "404", description = "Conférence non trouvée")
    })
    public ResponseEntity<ConferenceDTO> getConferenceById(
            @Parameter(description = "ID de la conférence") @PathVariable Long id) {
        ConferenceDTO conference = conferenceService.getConferenceById(id);
        return ResponseEntity.ok(conference);
    }
    
    @GetMapping
    @Operation(summary = "Lister toutes les conférences", description = "Récupère la liste de toutes les conférences")
    @ApiResponse(responseCode = "200", description = "Liste des conférences récupérée")
    public ResponseEntity<List<ConferenceDTO>> getAllConferences() {
        List<ConferenceDTO> conferences = conferenceService.getAllConferences();
        return ResponseEntity.ok(conferences);
    }
    
    @GetMapping("/type/{type}")
    @Operation(summary = "Filtrer par type", description = "Récupère les conférences par type (ACADEMIQUE ou COMMERCIALE)")
    public ResponseEntity<List<ConferenceDTO>> getConferencesByType(
            @Parameter(description = "Type de conférence") @PathVariable ConferenceType type) {
        List<ConferenceDTO> conferences = conferenceService.getConferencesByType(type);
        return ResponseEntity.ok(conferences);
    }
    
    @GetMapping("/keynote/{keynoteId}")
    @Operation(summary = "Filtrer par keynote", description = "Récupère les conférences d'un intervenant")
    public ResponseEntity<List<ConferenceDTO>> getConferencesByKeynoteId(
            @Parameter(description = "ID du keynote") @PathVariable Long keynoteId) {
        List<ConferenceDTO> conferences = conferenceService.getConferencesByKeynoteId(keynoteId);
        return ResponseEntity.ok(conferences);
    }
    
    @GetMapping("/date-range")
    @Operation(summary = "Filtrer par période", description = "Récupère les conférences dans une période donnée")
    public ResponseEntity<List<ConferenceDTO>> getConferencesByDateRange(
            @Parameter(description = "Date de début") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @Parameter(description = "Date de fin") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ConferenceDTO> conferences = conferenceService.getConferencesByDateRange(startDate, endDate);
        return ResponseEntity.ok(conferences);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Rechercher par titre", description = "Recherche des conférences par titre")
    public ResponseEntity<List<ConferenceDTO>> searchByTitre(
            @Parameter(description = "Titre à rechercher") @RequestParam String titre) {
        List<ConferenceDTO> conferences = conferenceService.searchByTitre(titre);
        return ResponseEntity.ok(conferences);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour une conférence", description = "Met à jour les informations d'une conférence existante")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conférence mise à jour"),
            @ApiResponse(responseCode = "400", description = "Données invalides"),
            @ApiResponse(responseCode = "404", description = "Conférence non trouvée")
    })
    public ResponseEntity<ConferenceDTO> updateConference(
            @Parameter(description = "ID de la conférence") @PathVariable Long id,
            @Valid @RequestBody ConferenceRequestDTO conferenceRequestDTO) {
        ConferenceDTO updatedConference = conferenceService.updateConference(id, conferenceRequestDTO);
        return ResponseEntity.ok(updatedConference);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer une conférence", description = "Supprime une conférence du système")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Conférence supprimée"),
            @ApiResponse(responseCode = "404", description = "Conférence non trouvée")
    })
    public ResponseEntity<Void> deleteConference(
            @Parameter(description = "ID de la conférence") @PathVariable Long id) {
        conferenceService.deleteConference(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/reviews")
    @Operation(summary = "Ajouter une review", description = "Ajoute une review à une conférence")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Review ajoutée"),
            @ApiResponse(responseCode = "400", description = "Données invalides"),
            @ApiResponse(responseCode = "404", description = "Conférence non trouvée")
    })
    public ResponseEntity<ConferenceDTO> addReview(
            @Parameter(description = "ID de la conférence") @PathVariable Long id,
            @Valid @RequestBody ReviewRequestDTO reviewRequestDTO) {
        ConferenceDTO updatedConference = conferenceService.addReview(id, reviewRequestDTO);
        return new ResponseEntity<>(updatedConference, HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{conferenceId}/reviews/{reviewId}")
    @Operation(summary = "Supprimer une review", description = "Supprime une review d'une conférence")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Review supprimée"),
            @ApiResponse(responseCode = "404", description = "Conférence ou review non trouvée")
    })
    public ResponseEntity<Void> deleteReview(
            @Parameter(description = "ID de la conférence") @PathVariable Long conferenceId,
            @Parameter(description = "ID de la review") @PathVariable Long reviewId) {
        conferenceService.deleteReview(conferenceId, reviewId);
        return ResponseEntity.noContent().build();
    }
}
