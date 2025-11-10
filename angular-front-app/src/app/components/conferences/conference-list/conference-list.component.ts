import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConferenceService } from '../../../services/conference.service';
import { KeynoteService } from '../../../services/keynote.service';
import { Conference, ConferenceRequest, ConferenceType } from '../../../models/conference.model';
import { Keynote } from '../../../models/keynote.model';

@Component({
  selector: 'app-conference-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-header" style="background: linear-gradient(135deg, #f72585 0%, #b5179e 100%);">
      <div class="container">
        <h1><i class="bi bi-calendar-check me-3"></i>Gestion des Conférences</h1>
        <p class="lead">Liste des conférences</p>
      </div>
    </div>

    <div class="container">
      <!-- Actions Bar -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-4 mb-3 mb-md-0">
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control" placeholder="Rechercher..." 
                       [(ngModel)]="searchTerm" (keyup)="search()">
              </div>
            </div>
            <div class="col-md-4 mb-3 mb-md-0">
              <select class="form-select" [(ngModel)]="filterType" (change)="filterByType()">
                <option value="">Tous les types</option>
                <option value="ACADEMIQUE">Académique</option>
                <option value="COMMERCIALE">Commerciale</option>
              </select>
            </div>
            <div class="col-md-4 text-md-end">
              <button class="btn btn-primary" style="background: linear-gradient(135deg, #f72585 0%, #b5179e 100%);" (click)="openModal()">
                <i class="bi bi-plus-circle me-2"></i>Nouvelle Conférence
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading-spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Alerts -->
      <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show">
        <i class="bi bi-exclamation-triangle me-2"></i>{{ errorMessage }}
        <button type="button" class="btn-close" (click)="errorMessage = ''"></button>
      </div>

      <div *ngIf="successMessage" class="alert alert-success alert-dismissible fade show">
        <i class="bi bi-check-circle me-2"></i>{{ successMessage }}
        <button type="button" class="btn-close" (click)="successMessage = ''"></button>
      </div>

      <!-- Conferences Grid -->
      <div class="row" *ngIf="!loading">
        <div class="col-md-6 col-lg-4 mb-4" *ngFor="let conference of conferences">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center"
                 [style.background]="conference.type === 'ACADEMIQUE' ? 
                   'linear-gradient(135deg, #4895ef 0%, #4361ee 100%)' : 
                   'linear-gradient(135deg, #f72585 0%, #b5179e 100%)'">
              <span>
                <i class="bi" [class.bi-mortarboard]="conference.type === 'ACADEMIQUE'" 
                   [class.bi-briefcase]="conference.type === 'COMMERCIALE'"></i>
                {{ conference.type }}
              </span>
              <span class="star-rating">
                <i class="bi bi-star-fill" *ngFor="let star of getStars(conference.score)"></i>
                <span class="ms-1">({{ conference.score | number:'1.1-1' }})</span>
              </span>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ conference.titre }}</h5>
              <p class="card-text text-muted small">
                <i class="bi bi-calendar me-2"></i>{{ conference.date }}<br>
                <i class="bi bi-clock me-2"></i>{{ conference.duree }} min<br>
                <i class="bi bi-people me-2"></i>{{ conference.nombreInscrits }} inscrits
              </p>
              <div *ngIf="conference.keynote" class="mb-3">
                <small class="text-muted">Keynote:</small>
                <div class="fw-bold">{{ conference.keynote.prenom }} {{ conference.keynote.nom }}</div>
                <small class="text-muted">{{ conference.keynote.fonction }}</small>
              </div>
            </div>
            <div class="card-footer bg-white border-0">
              <div class="d-flex justify-content-between">
                <a [routerLink]="['/conferences', conference.id]" class="btn btn-sm btn-outline-primary">
                  <i class="bi bi-eye me-1"></i>Détails
                </a>
                <div>
                  <button class="btn btn-sm btn-outline-secondary me-1" (click)="editConference(conference)">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" (click)="deleteConference(conference.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12" *ngIf="conferences.length === 0">
          <div class="text-center py-5">
            <i class="bi bi-calendar-x text-muted" style="font-size: 4rem;"></i>
            <p class="mt-3 text-muted">Aucune conférence trouvée</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" [class.show]="showModal" [style.display]="showModal ? 'block' : 'none'">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header" style="background: linear-gradient(135deg, #f72585 0%, #b5179e 100%);">
            <h5 class="modal-title">
              <i class="bi bi-calendar-plus me-2"></i>
              {{ editingConference ? 'Modifier' : 'Nouvelle' }} Conférence
            </h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label class="form-label">Titre *</label>
                  <input type="text" class="form-control" [(ngModel)]="conferenceForm.titre" name="titre" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Type *</label>
                  <select class="form-select" [(ngModel)]="conferenceForm.type" name="type" required>
                    <option value="ACADEMIQUE">Académique</option>
                    <option value="COMMERCIALE">Commerciale</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label class="form-label">Date *</label>
                  <input type="date" class="form-control" [(ngModel)]="conferenceForm.date" name="date" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Durée (min) *</label>
                  <input type="number" class="form-control" [(ngModel)]="conferenceForm.duree" name="duree" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Nombre d'inscrits</label>
                  <input type="number" class="form-control" [(ngModel)]="conferenceForm.nombreInscrits" name="nombreInscrits">
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Keynote</label>
                <select class="form-select" [(ngModel)]="conferenceForm.keynoteId" name="keynoteId">
                  <option [ngValue]="null">-- Sélectionner un keynote --</option>
                  <option *ngFor="let keynote of keynotes" [ngValue]="keynote.id">
                    {{ keynote.prenom }} {{ keynote.nom }} - {{ keynote.fonction }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Annuler</button>
            <button type="button" class="btn btn-primary" 
                    style="background: linear-gradient(135deg, #f72585 0%, #b5179e 100%);" 
                    (click)="saveConference()">
              <i class="bi bi-check-circle me-2"></i>Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="showModal" (click)="closeModal()"></div>
  `
})
export class ConferenceListComponent implements OnInit {
  conferences: Conference[] = [];
  keynotes: Keynote[] = [];
  loading = false;
  showModal = false;
  editingConference: Conference | null = null;
  errorMessage = '';
  successMessage = '';
  searchTerm = '';
  filterType = '';

  conferenceForm: ConferenceRequest = {
    titre: '',
    type: 'ACADEMIQUE',
    date: '',
    duree: 60,
    nombreInscrits: 0,
    keynoteId: 0
  };

  constructor(
    private conferenceService: ConferenceService,
    private keynoteService: KeynoteService
  ) {}

  ngOnInit(): void {
    this.loadConferences();
    this.loadKeynotes();
  }

  loadConferences(): void {
    this.loading = true;
    this.conferenceService.getAllConferences().subscribe({
      next: (data) => {
        this.conferences = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des conférences';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadKeynotes(): void {
    this.keynoteService.getAllKeynotes().subscribe({
      next: (data) => this.keynotes = data,
      error: (err) => console.error(err)
    });
  }

  search(): void {
    if (this.searchTerm.trim() === '') {
      this.loadConferences();
    } else {
      this.conferenceService.searchByTitre(this.searchTerm).subscribe({
        next: (data) => this.conferences = data,
        error: (err) => console.error(err)
      });
    }
  }

  filterByType(): void {
    if (this.filterType === '') {
      this.loadConferences();
    } else {
      this.conferenceService.getConferencesByType(this.filterType as ConferenceType).subscribe({
        next: (data) => this.conferences = data,
        error: (err) => console.error(err)
      });
    }
  }

  getStars(score: number): number[] {
    return Array(Math.round(score)).fill(0);
  }

  openModal(): void {
    this.editingConference = null;
    this.conferenceForm = {
      titre: '',
      type: 'ACADEMIQUE',
      date: '',
      duree: 60,
      nombreInscrits: 0,
      keynoteId: 0
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingConference = null;
  }

  editConference(conference: Conference): void {
    this.editingConference = conference;
    this.conferenceForm = {
      titre: conference.titre,
      type: conference.type,
      date: conference.date,
      duree: conference.duree,
      nombreInscrits: conference.nombreInscrits,
      keynoteId: conference.keynoteId
    };
    this.showModal = true;
  }

  saveConference(): void {
    if (this.editingConference) {
      this.conferenceService.updateConference(this.editingConference.id, this.conferenceForm).subscribe({
        next: () => {
          this.successMessage = 'Conférence mise à jour avec succès';
          this.loadConferences();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la mise à jour';
          console.error(err);
        }
      });
    } else {
      this.conferenceService.createConference(this.conferenceForm).subscribe({
        next: () => {
          this.successMessage = 'Conférence créée avec succès';
          this.loadConferences();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la création';
          console.error(err);
        }
      });
    }
  }

  deleteConference(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette conférence ?')) {
      this.conferenceService.deleteConference(id).subscribe({
        next: () => {
          this.successMessage = 'Conférence supprimée avec succès';
          this.loadConferences();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }
}

