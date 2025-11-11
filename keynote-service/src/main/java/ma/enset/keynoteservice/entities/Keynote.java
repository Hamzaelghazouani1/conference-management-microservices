package ma.enset.keynoteservice.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Keynote {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;
    
    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;
    
    @Email(message = "Email invalide")
    @NotBlank(message = "L'email est obligatoire")
    @Column(unique = true)
    private String email;
    
    @NotBlank(message = "La fonction est obligatoire")
    private String fonction;
    
    public Keynote() {}
    
    public Keynote(Long id, String nom, String prenom, String email, String fonction) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.fonction = fonction;
    }
    
    // Static builder method
    public static KeynoteBuilder builder() {
        return new KeynoteBuilder();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFonction() { return fonction; }
    public void setFonction(String fonction) { this.fonction = fonction; }
    
    @Override
    public String toString() {
        return "Keynote{id=" + id + ", nom='" + nom + "', prenom='" + prenom + "', email='" + email + "', fonction='" + fonction + "'}";
    }
    
    // Builder class
    public static class KeynoteBuilder {
        private Long id;
        private String nom;
        private String prenom;
        private String email;
        private String fonction;
        
        public KeynoteBuilder id(Long id) { this.id = id; return this; }
        public KeynoteBuilder nom(String nom) { this.nom = nom; return this; }
        public KeynoteBuilder prenom(String prenom) { this.prenom = prenom; return this; }
        public KeynoteBuilder email(String email) { this.email = email; return this; }
        public KeynoteBuilder fonction(String fonction) { this.fonction = fonction; return this; }
        
        public Keynote build() {
            return new Keynote(id, nom, prenom, email, fonction);
        }
    }
}
