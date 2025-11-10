import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}

