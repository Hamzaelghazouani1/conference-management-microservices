export const environment = {
  production: false,
  apiUrl: 'http://localhost:8888',
  // For development without Keycloak, use direct service URLs
  keynoteApiUrl: 'http://localhost:8081',
  conferenceApiUrl: 'http://localhost:8082',
  keycloak: {
    enabled: false, // Set to true when Keycloak is running
    url: 'http://localhost:8080',
    realm: 'conference-realm',
    clientId: 'conference-client'
  }
};
