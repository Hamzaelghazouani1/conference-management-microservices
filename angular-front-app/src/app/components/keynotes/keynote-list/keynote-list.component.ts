import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeynoteService } from '../../../services/keynote.service';
import { Keynote, KeynoteRequest } from '../../../models/keynote.model';

@Component({
  selector: 'app-keynote-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="container">
        <h1><i class="bi bi-people me-3"></i>Gestion des Keynotes</h1>
        <p class="lead">Liste des intervenants</p>
      </div>
    </div>

    <div class="container">
      <!-- Actions Bar -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-6 mb-3 mb-md-0">
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input type="text" class="form-control" placeholder="Rechercher..." 
                       [(ngModel)]="searchTerm" (keyup)="search()">
              </div>
            </div>
            <div class="col-md-6 text-md-end">
              <button class="btn btn-primary" (click)="openModal()">
                <i class="bi bi-plus-circle me-2"></i>Nouveau Keynote
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

      <!-- Error Alert -->
      <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show">
        <i class="bi bi-exclamation-triangle me-2"></i>{{ errorMessage }}
        <button type="button" class="btn-close" (click)="errorMessage = ''"></button>
      </div>

      <!-- Success Alert -->
      <div *ngIf="successMessage" class="alert alert-success alert-dismissible fade show">
        <i class="bi bi-check-circle me-2"></i>{{ successMessage }}
        <button type="button" class="btn-close" (click)="successMessage = ''"></button>
      </div>

      <!-- Keynotes Table -->
      <div class="table-responsive" *ngIf="!loading">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Fonction</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let keynote of keynotes">
              <td>{{ keynote.id }}</td>
              <td>{{ keynote.nom }}</td>
              <td>{{ keynote.prenom }}</td>
              <td>
                <a [href]="'mailto:' + keynote.email">{{ keynote.email }}</a>
              </td>
              <td><span class="badge bg-primary">{{ keynote.fonction }}</span></td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2" (click)="editKeynote(keynote)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" (click)="deleteKeynote(keynote.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr *ngIf="keynotes.length === 0">
              <td colspan="6" class="text-center py-4">
                <i class="bi bi-inbox text-muted" style="font-size: 3rem;"></i>
                <p class="mt-2 text-muted">Aucun keynote trouvé</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="keynoteModal" tabindex="-1" [class.show]="showModal" [style.display]="showModal ? 'block' : 'none'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-person-plus me-2"></i>
              {{ editingKeynote ? 'Modifier' : 'Nouveau' }} Keynote
            </h5>
            <button type="button" class="btn-close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="saveKeynote()">
              <div class="mb-3">
                <label class="form-label">Nom *</label>
                <input type="text" class="form-control" [(ngModel)]="keynoteForm.nom" name="nom" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Prénom *</label>
                <input type="text" class="form-control" [(ngModel)]="keynoteForm.prenom" name="prenom" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email *</label>
                <input type="email" class="form-control" [(ngModel)]="keynoteForm.email" name="email" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Fonction *</label>
                <input type="text" class="form-control" [(ngModel)]="keynoteForm.fonction" name="fonction" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Annuler</button>
            <button type="button" class="btn btn-primary" (click)="saveKeynote()">
              <i class="bi bi-check-circle me-2"></i>Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="showModal" (click)="closeModal()"></div>
  `
})
export class KeynoteListComponent implements OnInit {
  keynotes: Keynote[] = [];
  loading = false;
  showModal = false;
  editingKeynote: Keynote | null = null;
  errorMessage = '';
  successMessage = '';
  searchTerm = '';

  keynoteForm: KeynoteRequest = {
    nom: '',
    prenom: '',
    email: '',
    fonction: ''
  };

  constructor(private keynoteService: KeynoteService) {}

  ngOnInit(): void {
    this.loadKeynotes();
  }

  loadKeynotes(): void {
    this.loading = true;
    this.keynoteService.getAllKeynotes().subscribe({
      next: (data) => {
        this.keynotes = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des keynotes';
        this.loading = false;
        console.error(err);
      }
    });
  }

  search(): void {
    if (this.searchTerm.trim() === '') {
      this.loadKeynotes();
    } else {
      this.keynoteService.searchByNom(this.searchTerm).subscribe({
        next: (data) => this.keynotes = data,
        error: (err) => console.error(err)
      });
    }
  }

  openModal(): void {
    this.editingKeynote = null;
    this.keynoteForm = { nom: '', prenom: '', email: '', fonction: '' };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingKeynote = null;
  }

  editKeynote(keynote: Keynote): void {
    this.editingKeynote = keynote;
    this.keynoteForm = {
      nom: keynote.nom,
      prenom: keynote.prenom,
      email: keynote.email,
      fonction: keynote.fonction
    };
    this.showModal = true;
  }

  saveKeynote(): void {
    if (this.editingKeynote) {
      this.keynoteService.updateKeynote(this.editingKeynote.id, this.keynoteForm).subscribe({
        next: () => {
          this.successMessage = 'Keynote mis à jour avec succès';
          this.loadKeynotes();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la mise à jour';
          console.error(err);
        }
      });
    } else {
      this.keynoteService.createKeynote(this.keynoteForm).subscribe({
        next: () => {
          this.successMessage = 'Keynote créé avec succès';
          this.loadKeynotes();
          this.closeModal();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la création';
          console.error(err);
        }
      });
    }
  }

  deleteKeynote(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce keynote ?')) {
      this.keynoteService.deleteKeynote(id).subscribe({
        next: () => {
          this.successMessage = 'Keynote supprimé avec succès';
          this.loadKeynotes();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }
}

