import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak: Keycloak | undefined;
  private authenticated = false;

  async init(): Promise<boolean> {
    this.keycloak = new Keycloak({
      url: environment.keycloakUrl,
      realm: environment.keycloakRealm,
      clientId: environment.keycloakClientId
    });

    try {
      this.authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: false
      });
      return this.authenticated;
    } catch (error) {
      console.error('Keycloak init error:', error);
      return false;
    }
  }

  login(): void {
    this.keycloak?.login();
  }

  logout(): void {
    this.keycloak?.logout({ redirectUri: window.location.origin });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getToken(): string | undefined {
    return this.keycloak?.token;
  }

  async updateToken(minValidity: number = 5): Promise<boolean> {
    try {
      const refreshed = await this.keycloak?.updateToken(minValidity);
      return refreshed || false;
    } catch {
      return false;
    }
  }

  getUsername(): string {
    return this.keycloak?.tokenParsed?.['preferred_username'] || '';
  }

  getUserRoles(): string[] {
    return this.keycloak?.tokenParsed?.['realm_access']?.['roles'] || [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }
}

