# Architecture Technique Détaillée

## 1. Vue d'Ensemble

Cette application suit une architecture microservices où chaque service est indépendant, déployable séparément, et communique avec les autres via des API REST.

## 2. Choix Techniques et Justifications

### 2.1 Discovery Service - Eureka

**Choix :** Netflix Eureka Server

**Justification :**
- Solution mature et éprouvée dans l'écosystème Spring Cloud
- Auto-enregistrement des services
- Health checks automatiques
- Interface de monitoring intégrée
- Large documentation et communauté active

### 2.2 Configuration Centralisée - Spring Cloud Config

**Choix :** Spring Cloud Config avec profil natif

**Justification :**
- Configuration externalisée et centralisée
- Rafraîchissement dynamique des configurations
- Support de plusieurs environnements (dev, prod)
- Intégration native avec Spring Boot

### 2.3 API Gateway - Spring Cloud Gateway

**Choix :** Spring Cloud Gateway

**Justification :**
- Point d'entrée unique pour tous les clients
- Routage intelligent basé sur le discovery
- Support des filtres (authentification, logging)
- Load balancing intégré
- Compatible avec la programmation réactive

### 2.4 Communication Inter-services - OpenFeign

**Choix :** Spring Cloud OpenFeign

**Justification :**
- Client HTTP déclaratif
- Intégration avec Eureka pour la découverte de services
- Syntaxe simple basée sur les annotations
- Support du load balancing client-side

### 2.5 Tolérance aux Pannes - Resilience4J

**Choix :** Resilience4J

**Justification :**
- Remplacement moderne de Hystrix (déprécié)
- Circuit Breaker pattern
- Retry, Rate Limiter, Bulkhead
- Léger et sans dépendances transitives
- Intégration native avec Spring Boot

### 2.6 Base de Données - H2

**Choix :** H2 In-Memory Database

**Justification :**
- Simplicité pour le développement et les tests
- Console web intégrée pour le debugging
- Compatible JPA/Hibernate
- Aucune installation requise

### 2.7 Mapping DTO - MapStruct

**Choix :** MapStruct

**Justification :**
- Génération de code à la compilation (performance)
- Type-safe
- Pas de réflexion au runtime
- Intégration facile avec Spring

### 2.8 Documentation API - SpringDoc OpenAPI

**Choix :** SpringDoc OpenAPI 3

**Justification :**
- Compatible Spring Boot 3
- Génération automatique de la documentation
- Interface Swagger UI intégrée
- Support des annotations OpenAPI 3

### 2.9 Sécurité - Keycloak

**Choix :** Keycloak avec OAuth2/OIDC

**Justification :**
- Solution open-source complète
- Support OAuth2 et OpenID Connect
- Gestion des utilisateurs et rôles
- SSO (Single Sign-On)
- Administration via interface web

## 3. Patterns Architecturaux

### 3.1 Service Registry Pattern
Les services s'enregistrent auprès d'Eureka et découvrent les autres services dynamiquement.

```
Service A → Register → Eureka ← Discover ← Service B
```

### 3.2 API Gateway Pattern
Tous les clients passent par le Gateway qui route vers le bon service.

```
Client → Gateway → Service Discovery → Target Service
```

### 3.3 Circuit Breaker Pattern
Protection contre les cascades de pannes entre services.

```
Conference Service → Circuit Breaker → Keynote Service
                         ↓ (si panne)
                    Fallback Response
```

### 3.4 Externalized Configuration Pattern
Configuration centralisée et versionnée.

```
Service → Config Client → Config Server → config-repo/
```

## 4. Flux de Données

### 4.1 Requête Client Standard

```
1. Client Angular envoie requête HTTP
2. Gateway reçoit la requête
3. Gateway consulte Eureka pour localiser le service
4. Gateway route vers le service cible
5. Service traite et répond
6. Gateway retourne la réponse au client
```

### 4.2 Communication Inter-services

```
1. Conference Service a besoin des données Keynote
2. Feign Client fait une requête via Eureka
3. Circuit Breaker monitore l'appel
4. Si succès: données retournées
5. Si échec: fallback activé
```

## 5. Modèle de Données

### 5.1 Keynote Entity

| Champ | Type | Description |
|-------|------|-------------|
| id | Long | Identifiant unique (auto-généré) |
| nom | String | Nom de famille |
| prenom | String | Prénom |
| email | String | Adresse email |
| fonction | String | Fonction/Titre professionnel |

### 5.2 Conference Entity

| Champ | Type | Description |
|-------|------|-------------|
| id | Long | Identifiant unique |
| titre | String | Titre de la conférence |
| type | Enum | ACADEMIQUE ou COMMERCIALE |
| date | LocalDate | Date de la conférence |
| duree | Integer | Durée en minutes |
| nombreInscrits | Integer | Nombre de participants inscrits |
| score | Double | Score moyen (calculé des reviews) |
| keynoteId | Long | Référence vers le keynote speaker |

### 5.3 Review Entity

| Champ | Type | Description |
|-------|------|-------------|
| id | Long | Identifiant unique |
| date | LocalDate | Date de la review |
| texte | String | Contenu de la review |
| note | Integer | Note de 1 à 5 étoiles |
| conferenceId | Long | Référence vers la conférence |

## 6. Sécurité

### 6.1 Flux OAuth2 Authorization Code

```
1. User accède à Angular App
2. Angular redirige vers Keycloak
3. User s'authentifie
4. Keycloak retourne un code d'autorisation
5. Angular échange le code contre des tokens
6. Angular utilise le token pour les requêtes API
7. Gateway/Services valident le token JWT
```

### 6.2 Rôles et Permissions

| Rôle | Permissions |
|------|-------------|
| USER | Lecture des données, création de reviews |
| ADMIN | Toutes les opérations CRUD |

## 7. Déploiement

### 7.1 Architecture Docker

Chaque service est containerisé avec son propre Dockerfile et orchestré via Docker Compose.

### 7.2 Ordre de Démarrage

1. **Config Service** - Doit être prêt en premier
2. **Discovery Service** - Dépend de Config
3. **Keycloak** - Indépendant
4. **Gateway Service** - Dépend de Discovery
5. **Keynote Service** - Dépend de Config et Discovery
6. **Conference Service** - Dépend de Keynote Service
7. **Angular App** - Dépend de Gateway

## 8. Monitoring et Observabilité

- **Eureka Dashboard** : État des services enregistrés
- **Spring Boot Actuator** : Health checks et métriques
- **H2 Console** : Inspection des données
- **Swagger UI** : Test des APIs

## 9. Évolutions Possibles

- Ajout de Zipkin/Jaeger pour le distributed tracing
- Intégration de Prometheus/Grafana pour le monitoring
- Migration vers une base de données persistante (PostgreSQL)
- Ajout de messaging asynchrone (RabbitMQ/Kafka)
- Déploiement sur Kubernetes

