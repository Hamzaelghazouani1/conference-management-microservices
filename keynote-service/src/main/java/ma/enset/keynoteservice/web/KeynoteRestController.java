package ma.enset.keynoteservice.web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.enset.keynoteservice.dtos.KeynoteDTO;
import ma.enset.keynoteservice.dtos.KeynoteRequestDTO;
import ma.enset.keynoteservice.services.KeynoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/keynotes")
@RequiredArgsConstructor
@Tag(name = "Keynote Management", description = "APIs pour la gestion des intervenants (Keynotes)")
public class KeynoteRestController {
    
    private final KeynoteService keynoteService;
    
    @PostMapping
    @Operation(summary = "Créer un nouveau keynote", description = "Crée un nouvel intervenant dans le système")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Keynote créé avec succès"),
            @ApiResponse(responseCode = "400", description = "Données invalides"),
            @ApiResponse(responseCode = "409", description = "Email déjà existant")
    })
    public ResponseEntity<KeynoteDTO> createKeynote(@Valid @RequestBody KeynoteRequestDTO keynoteRequestDTO) {
        KeynoteDTO createdKeynote = keynoteService.createKeynote(keynoteRequestDTO);
        return new ResponseEntity<>(createdKeynote, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un keynote par ID", description = "Récupère les détails d'un intervenant par son identifiant")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Keynote trouvé"),
            @ApiResponse(responseCode = "404", description = "Keynote non trouvé")
    })
    public ResponseEntity<KeynoteDTO> getKeynoteById(
            @Parameter(description = "ID du keynote") @PathVariable Long id) {
        KeynoteDTO keynote = keynoteService.getKeynoteById(id);
        return ResponseEntity.ok(keynote);
    }
    
    @GetMapping("/email/{email}")
    @Operation(summary = "Obtenir un keynote par email", description = "Récupère les détails d'un intervenant par son email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Keynote trouvé"),
            @ApiResponse(responseCode = "404", description = "Keynote non trouvé")
    })
    public ResponseEntity<KeynoteDTO> getKeynoteByEmail(
            @Parameter(description = "Email du keynote") @PathVariable String email) {
        KeynoteDTO keynote = keynoteService.getKeynoteByEmail(email);
        return ResponseEntity.ok(keynote);
    }
    
    @GetMapping
    @Operation(summary = "Lister tous les keynotes", description = "Récupère la liste de tous les intervenants")
    @ApiResponse(responseCode = "200", description = "Liste des keynotes récupérée")
    public ResponseEntity<List<KeynoteDTO>> getAllKeynotes() {
        List<KeynoteDTO> keynotes = keynoteService.getAllKeynotes();
        return ResponseEntity.ok(keynotes);
    }
    
    @GetMapping("/search/nom")
    @Operation(summary = "Rechercher par nom", description = "Recherche des intervenants par nom")
    public ResponseEntity<List<KeynoteDTO>> searchByNom(
            @Parameter(description = "Nom à rechercher") @RequestParam String nom) {
        List<KeynoteDTO> keynotes = keynoteService.searchByNom(nom);
        return ResponseEntity.ok(keynotes);
    }
    
    @GetMapping("/search/fonction")
    @Operation(summary = "Rechercher par fonction", description = "Recherche des intervenants par fonction")
    public ResponseEntity<List<KeynoteDTO>> searchByFonction(
            @Parameter(description = "Fonction à rechercher") @RequestParam String fonction) {
        List<KeynoteDTO> keynotes = keynoteService.searchByFonction(fonction);
        return ResponseEntity.ok(keynotes);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un keynote", description = "Met à jour les informations d'un intervenant existant")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Keynote mis à jour"),
            @ApiResponse(responseCode = "400", description = "Données invalides"),
            @ApiResponse(responseCode = "404", description = "Keynote non trouvé"),
            @ApiResponse(responseCode = "409", description = "Email déjà existant")
    })
    public ResponseEntity<KeynoteDTO> updateKeynote(
            @Parameter(description = "ID du keynote") @PathVariable Long id,
            @Valid @RequestBody KeynoteRequestDTO keynoteRequestDTO) {
        KeynoteDTO updatedKeynote = keynoteService.updateKeynote(id, keynoteRequestDTO);
        return ResponseEntity.ok(updatedKeynote);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un keynote", description = "Supprime un intervenant du système")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Keynote supprimé"),
            @ApiResponse(responseCode = "404", description = "Keynote non trouvé")
    })
    public ResponseEntity<Void> deleteKeynote(
            @Parameter(description = "ID du keynote") @PathVariable Long id) {
        keynoteService.deleteKeynote(id);
        return ResponseEntity.noContent().build();
    }
}

