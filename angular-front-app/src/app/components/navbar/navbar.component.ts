import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark mb-4">
      <div class="container">
        <a class="navbar-brand" routerLink="/home">
          <i class="bi bi-calendar-event me-2"></i>
          Conference Manager
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home" routerLinkActive="active">
                <i class="bi bi-house-door me-1"></i> Accueil
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/keynotes" routerLinkActive="active">
                <i class="bi bi-people me-1"></i> Keynotes
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/conferences" routerLinkActive="active">
                <i class="bi bi-calendar-check me-1"></i> Conférences
              </a>
            </li>
            
            <!-- Auth Section -->
            <li class="nav-item ms-lg-3" *ngIf="!isAuthenticated">
              <button class="btn btn-outline-light btn-sm" (click)="login()">
                <i class="bi bi-box-arrow-in-right me-1"></i> Connexion
              </button>
            </li>
            
            <li class="nav-item dropdown ms-lg-3" *ngIf="isAuthenticated">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle me-1"></i>
                {{ username }}
                <span class="badge bg-warning text-dark ms-1" *ngIf="isAdmin">Admin</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><span class="dropdown-item-text text-muted small">Rôles: {{ roles.join(', ') }}</span></li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" (click)="logout($event)">
                    <i class="bi bi-box-arrow-right me-2"></i>Déconnexion
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  username = '';
  roles: string[] = [];
  isAdmin = false;

  constructor(private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    await this.authService.init();
    this.updateAuthState();
  }

  updateAuthState(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.username = this.authService.getUsername();
    this.roles = this.authService.getUserRoles().filter(r => ['USER', 'ADMIN'].includes(r));
    this.isAdmin = this.authService.isAdmin();
  }

  login(): void {
    this.authService.login();
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
