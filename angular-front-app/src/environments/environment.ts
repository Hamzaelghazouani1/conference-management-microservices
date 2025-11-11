export const environment = {
  production: true,
  apiUrl: 'http://localhost:8888',
  keynoteApiUrl: 'http://localhost:8081',
  conferenceApiUrl: 'http://localhost:8082',
  keycloak: {
    enabled: true,
    url: 'http://localhost:8080',
    realm: 'conference-realm',
    clientId: 'conference-client'
  }
};
