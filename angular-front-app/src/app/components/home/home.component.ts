import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KeynoteService } from '../../services/keynote.service';
import { ConferenceService } from '../../services/conference.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header text-center">
      <div class="container">
        <h1><i class="bi bi-calendar-event me-3"></i>Système de Gestion de Conférences</h1>
        <p class="lead mt-3">Application basée sur une architecture Microservices</p>
      </div>
    </div>

    <div class="container">
      <!-- Statistics -->
      <div class="row mb-5">
        <div class="col-md-4 mb-3">
          <div class="stat-card">
            <div class="stat-number">{{ keynoteCount }}</div>
            <div class="stat-label"><i class="bi bi-people me-2"></i>Keynotes</div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="stat-card" style="background: linear-gradient(135deg, #f72585 0%, #b5179e 100%);">
            <div class="stat-number">{{ conferenceCount }}</div>
            <div class="stat-label"><i class="bi bi-calendar-check me-2"></i>Conférences</div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="stat-card" style="background: linear-gradient(135deg, #4cc9f0 0%, #4895ef 100%);">
            <div class="stat-number">{{ totalInscrits }}</div>
            <div class="stat-label"><i class="bi bi-person-check me-2"></i>Inscrits</div>
          </div>
        </div>
      </div>

      <!-- Quick Access -->
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card h-100">
            <div class="card-header">
              <i class="bi bi-people me-2"></i>Gestion des Keynotes
            </div>
            <div class="card-body">
              <p class="card-text">
                Gérez les intervenants de vos conférences. Ajoutez, modifiez ou supprimez des keynotes.
              </p>
              <ul class="list-unstyled">
                <li><i class="bi bi-check-circle text-success me-2"></i>Créer de nouveaux keynotes</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Rechercher par nom ou fonction</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Modifier les informations</li>
              </ul>
              <a routerLink="/keynotes" class="btn btn-primary">
                <i class="bi bi-arrow-right me-2"></i>Voir les Keynotes
              </a>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-4">
          <div class="card h-100">
            <div class="card-header" style="background: linear-gradient(135deg, #f72585 0%, #b5179e 100%);">
              <i class="bi bi-calendar-check me-2"></i>Gestion des Conférences
            </div>
            <div class="card-body">
              <p class="card-text">
                Organisez vos conférences académiques et commerciales. Gérez les inscriptions et les reviews.
              </p>
              <ul class="list-unstyled">
                <li><i class="bi bi-check-circle text-success me-2"></i>Planifier des conférences</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Attribuer des keynotes</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Gérer les reviews</li>
              </ul>
              <a routerLink="/conferences" class="btn btn-primary" style="background: linear-gradient(135deg, #f72585 0%, #b5179e 100%);">
                <i class="bi bi-arrow-right me-2"></i>Voir les Conférences
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Architecture Info -->
      <div class="card mt-4">
        <div class="card-header" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
          <i class="bi bi-diagram-3 me-2"></i>Architecture Technique
        </div>
        <div class="card-body">
          <div class="row text-center">
            <div class="col-md-2 col-6 mb-3">
              <div class="p-3 bg-light rounded">
                <i class="bi bi-hdd-network text-primary" style="font-size: 2rem;"></i>
                <p class="mt-2 mb-0 small">Eureka Discovery</p>
              </div>
            </div>
            <div class="col-md-2 col-6 mb-3">
              <div class="p-3 bg-light rounded">
                <i class="bi bi-gear text-primary" style="font-size: 2rem;"></i>
                <p class="mt-2 mb-0 small">Config Server</p>
              </div>
            </div>
            <div class="col-md-2 col-6 mb-3">
              <div class="p-3 bg-light rounded">
                <i class="bi bi-shield-check text-primary" style="font-size: 2rem;"></i>
                <p class="mt-2 mb-0 small">Gateway</p>
              </div>
            </div>
            <div class="col-md-2 col-6 mb-3">
              <div class="p-3 bg-light rounded">
                <i class="bi bi-people text-primary" style="font-size: 2rem;"></i>
                <p class="mt-2 mb-0 small">Keynote Service</p>
              </div>
            </div>
            <div class="col-md-2 col-6 mb-3">
              <div class="p-3 bg-light rounded">
                <i class="bi bi-calendar text-primary" style="font-size: 2rem;"></i>
                <p class="mt-2 mb-0 small">Conference Service</p>
              </div>
            </div>
            <div class="col-md-2 col-6 mb-3">
              <div class="p-3 bg-light rounded">
                <i class="bi bi-key text-primary" style="font-size: 2rem;"></i>
                <p class="mt-2 mb-0 small">Keycloak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  keynoteCount = 0;
  conferenceCount = 0;
  totalInscrits = 0;

  constructor(
    private keynoteService: KeynoteService,
    private conferenceService: ConferenceService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.keynoteService.getAllKeynotes().subscribe({
      next: (keynotes) => this.keynoteCount = keynotes.length,
      error: (err) => console.error('Error loading keynotes', err)
    });

    this.conferenceService.getAllConferences().subscribe({
      next: (conferences) => {
        this.conferenceCount = conferences.length;
        this.totalInscrits = conferences.reduce((sum, c) => sum + (c.nombreInscrits || 0), 0);
      },
      error: (err) => console.error('Error loading conferences', err)
    });
  }
}

