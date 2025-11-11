import { Injectable, signal, computed } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';

/**
 * Authentication Service using Keycloak
 * Uses Angular Signals for reactive state management
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak: Keycloak | null = null;

  // Signals for reactive state
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _username = signal<string>('');
  private readonly _roles = signal<string[]>([]);
  private readonly _token = signal<string | undefined>(undefined);
  private readonly _isInitialized = signal<boolean>(false);

  // Public computed signals (read-only)
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly username = this._username.asReadonly();
  readonly roles = this._roles.asReadonly();
  readonly token = this._token.asReadonly();
  readonly isInitialized = this._isInitialized.asReadonly();

  // Computed signals for role checking
  readonly isAdmin = computed(() => this._roles().includes('ADMIN'));
  readonly isUser = computed(() => this._roles().includes('USER'));
  readonly displayRoles = computed(() => 
    this._roles().filter(r => ['USER', 'ADMIN'].includes(r))
  );

  // Check if Keycloak is enabled
  readonly keycloakEnabled = (environment.keycloak as any)?.enabled ?? true;

  /**
   * Initialize Keycloak
   */
  async init(): Promise<boolean> {
    // If Keycloak is disabled, skip initialization
    if (!this.keycloakEnabled) {
      console.log('Keycloak is disabled - running in demo mode');
      this._isInitialized.set(true);
      this._isAuthenticated.set(true);
      this._username.set('demo-user');
      this._roles.set(['USER', 'ADMIN']);
      return true;
    }

    if (this._isInitialized()) {
      return this._isAuthenticated();
    }

    this.keycloak = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId
    });

    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        checkLoginIframe: false
      });

      this._isAuthenticated.set(authenticated);
      this._isInitialized.set(true);

      if (authenticated) {
        this.updateUserInfo();
      }

      // Setup token refresh
      this.keycloak.onTokenExpired = () => {
        this.updateToken();
      };

      return authenticated;
    } catch (error) {
      console.error('Keycloak init error:', error);
      this._isInitialized.set(true);
      // In case of error, allow access in demo mode
      this._isAuthenticated.set(true);
      this._username.set('demo-user');
      this._roles.set(['USER']);
      return true;
    }
  }

  /**
   * Login user
   */
  login(): void {
    if (!this.keycloakEnabled) {
      this._isAuthenticated.set(true);
      this._username.set('demo-user');
      return;
    }
    this.keycloak?.login();
  }

  /**
   * Logout user
   */
  logout(): void {
    if (!this.keycloakEnabled) {
      this._isAuthenticated.set(false);
      this._username.set('');
      this._roles.set([]);
      return;
    }
    this.keycloak?.logout({ redirectUri: window.location.origin });
  }

  /**
   * Get current token
   */
  getToken(): string | undefined {
    if (!this.keycloakEnabled) {
      return 'demo-token';
    }
    return this.keycloak?.token;
  }

  /**
   * Update/refresh token
   */
  async updateToken(minValidity: number = 30): Promise<boolean> {
    if (!this.keycloakEnabled) {
      return true;
    }
    try {
      const refreshed = await this.keycloak?.updateToken(minValidity);
      if (refreshed) {
        this._token.set(this.keycloak?.token);
      }
      return refreshed ?? false;
    } catch {
      this.login();
      return false;
    }
  }

  /**
   * Update user info from token
   */
  private updateUserInfo(): void {
    if (this.keycloak?.tokenParsed) {
      this._username.set(this.keycloak.tokenParsed['preferred_username'] || '');
      this._roles.set(this.keycloak.tokenParsed['realm_access']?.['roles'] || []);
      this._token.set(this.keycloak.token);
    }
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    return this._roles().includes(role);
  }
}
