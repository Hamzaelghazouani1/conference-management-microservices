package ma.enset.conferenceservice.dtos;

public class KeynoteDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String fonction;
    
    public KeynoteDTO() {}
    
    public KeynoteDTO(Long id, String nom, String prenom, String email, String fonction) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.fonction = fonction;
    }
    
    public static KeynoteDTOBuilder builder() {
        return new KeynoteDTOBuilder();
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
    
    public static class KeynoteDTOBuilder {
        private Long id;
        private String nom;
        private String prenom;
        private String email;
        private String fonction;
        
        public KeynoteDTOBuilder id(Long id) { this.id = id; return this; }
        public KeynoteDTOBuilder nom(String nom) { this.nom = nom; return this; }
        public KeynoteDTOBuilder prenom(String prenom) { this.prenom = prenom; return this; }
        public KeynoteDTOBuilder email(String email) { this.email = email; return this; }
        public KeynoteDTOBuilder fonction(String fonction) { this.fonction = fonction; return this; }
        
        public KeynoteDTO build() {
            return new KeynoteDTO(id, nom, prenom, email, fonction);
        }
    }
}
