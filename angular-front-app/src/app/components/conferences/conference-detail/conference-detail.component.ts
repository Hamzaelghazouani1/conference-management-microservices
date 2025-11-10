import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConferenceService } from '../../../services/conference.service';
import { Conference, ReviewRequest } from '../../../models/conference.model';

@Component({
  selector: 'app-conference-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-header" style="background: linear-gradient(135deg, #f72585 0%, #b5179e 100%);">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-2">
            <li class="breadcrumb-item"><a routerLink="/conferences" class="text-white">Conférences</a></li>
            <li class="breadcrumb-item active text-white-50">Détails</li>
          </ol>
        </nav>
        <h1><i class="bi bi-calendar-check me-3"></i>{{ conference?.titre }}</h1>
      </div>
    </div>

    <div class="container">
      <!-- Loading -->
      <div *ngIf="loading" class="loading-spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Error -->
      <div *ngIf="errorMessage" class="alert alert-danger">
        <i class="bi bi-exclamation-triangle me-2"></i>{{ errorMessage }}
      </div>

      <div *ngIf="conference && !loading" class="row">
        <!-- Conference Details -->
        <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-header">
              <i class="bi bi-info-circle me-2"></i>Informations
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <strong><i class="bi bi-tag me-2"></i>Type:</strong>
                  <span class="badge ms-2" 
                        [class.badge-academique]="conference.type === 'ACADEMIQUE'"
                        [class.badge-commerciale]="conference.type === 'COMMERCIALE'">
                    {{ conference.type }}
                  </span>
                </div>
                <div class="col-md-6 mb-3">
                  <strong><i class="bi bi-calendar me-2"></i>Date:</strong>
                  <span class="ms-2">{{ conference.date }}</span>
                </div>
                <div class="col-md-6 mb-3">
                  <strong><i class="bi bi-clock me-2"></i>Durée:</strong>
                  <span class="ms-2">{{ conference.duree }} minutes</span>
                </div>
                <div class="col-md-6 mb-3">
                  <strong><i class="bi bi-people me-2"></i>Inscrits:</strong>
                  <span class="ms-2">{{ conference.nombreInscrits }}</span>
                </div>
                <div class="col-12 mb-3">
                  <strong><i class="bi bi-star me-2"></i>Score moyen:</strong>
                  <span class="star-rating ms-2">
                    <i class="bi bi-star-fill" *ngFor="let star of getStars(conference.score)"></i>
                    <span class="ms-1">({{ conference.score | number:'1.1-1' }}/5)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Keynote Info -->
          <div class="card mb-4" *ngIf="conference.keynote">
            <div class="card-header">
              <i class="bi bi-person-badge me-2"></i>Keynote Speaker
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style="width: 60px; height: 60px; font-size: 1.5rem;">
                  {{ conference.keynote.prenom.charAt(0) }}{{ conference.keynote.nom.charAt(0) }}
                </div>
                <div>
                  <h5 class="mb-0">{{ conference.keynote.prenom }} {{ conference.keynote.nom }}</h5>
                  <p class="text-muted mb-0">{{ conference.keynote.fonction }}</p>
                  <small><a [href]="'mailto:' + conference.keynote.email">{{ conference.keynote.email }}</a></small>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span><i class="bi bi-chat-dots me-2"></i>Reviews ({{ conference.reviews?.length || 0 }})</span>
              <button class="btn btn-sm btn-primary" (click)="showReviewForm = !showReviewForm">
                <i class="bi bi-plus-circle me-1"></i>Ajouter
              </button>
            </div>
            <div class="card-body">
              <!-- Add Review Form -->
              <div *ngIf="showReviewForm" class="mb-4 p-3 bg-light rounded">
                <h6><i class="bi bi-pencil-square me-2"></i>Nouvelle Review</h6>
                <div class="mb-3">
                  <label class="form-label">Note</label>
                  <div class="star-rating">
                    <i *ngFor="let star of [1,2,3,4,5]" 
                       class="bi fs-4" 
                       [class.bi-star]="star > reviewForm.note"
                       [class.bi-star-fill]="star <= reviewForm.note"
                       style="cursor: pointer;"
                       (click)="reviewForm.note = star"></i>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Commentaire</label>
                  <textarea class="form-control" rows="3" [(ngModel)]="reviewForm.texte" 
                            placeholder="Votre avis sur cette conférence..."></textarea>
                </div>
                <div class="d-flex gap-2">
                  <button class="btn btn-primary" (click)="addReview()">
                    <i class="bi bi-send me-1"></i>Publier
                  </button>
                  <button class="btn btn-secondary" (click)="showReviewForm = false">Annuler</button>
                </div>
              </div>

              <!-- Reviews List -->
              <div *ngFor="let review of conference.reviews" class="review-card">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div class="star-rating mb-1">
                      <i class="bi bi-star-fill" *ngFor="let star of getStars(review.note)"></i>
                    </div>
                    <p class="mb-1">{{ review.texte }}</p>
                    <small class="text-muted">{{ review.date }}</small>
                  </div>
                  <button class="btn btn-sm btn-outline-danger" (click)="deleteReview(review.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>

              <div *ngIf="!conference.reviews || conference.reviews.length === 0" class="text-center py-4">
                <i class="bi bi-chat-left-text text-muted" style="font-size: 3rem;"></i>
                <p class="mt-2 text-muted">Aucune review pour le moment</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <div class="card sticky-top" style="top: 20px;">
            <div class="card-header">
              <i class="bi bi-gear me-2"></i>Actions
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <a routerLink="/conferences" class="btn btn-outline-primary">
                  <i class="bi bi-arrow-left me-2"></i>Retour à la liste
                </a>
                <button class="btn btn-outline-secondary" (click)="editConference()">
                  <i class="bi bi-pencil me-2"></i>Modifier
                </button>
                <button class="btn btn-outline-danger" (click)="deleteConference()">
                  <i class="bi bi-trash me-2"></i>Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConferenceDetailComponent implements OnInit {
  conference: Conference | null = null;
  loading = false;
  errorMessage = '';
  showReviewForm = false;
  conferenceId: number = 0;

  reviewForm: ReviewRequest = {
    texte: '',
    note: 5
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conferenceService: ConferenceService
  ) {}

  ngOnInit(): void {
    this.conferenceId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadConference();
  }

  loadConference(): void {
    this.loading = true;
    this.conferenceService.getConferenceById(this.conferenceId).subscribe({
      next: (data) => {
        this.conference = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement de la conférence';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getStars(score: number): number[] {
    return Array(Math.round(score)).fill(0);
  }

  addReview(): void {
    if (!this.reviewForm.texte.trim()) {
      return;
    }
    
    this.conferenceService.addReview(this.conferenceId, this.reviewForm).subscribe({
      next: (data) => {
        this.conference = data;
        this.showReviewForm = false;
        this.reviewForm = { texte: '', note: 5 };
      },
      error: (err) => {
        console.error('Error adding review', err);
      }
    });
  }

  deleteReview(reviewId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette review ?')) {
      this.conferenceService.deleteReview(this.conferenceId, reviewId).subscribe({
        next: () => this.loadConference(),
        error: (err) => console.error('Error deleting review', err)
      });
    }
  }

  editConference(): void {
    // Navigate to list with edit modal - simplified for this example
    this.router.navigate(['/conferences']);
  }

  deleteConference(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette conférence ?')) {
      this.conferenceService.deleteConference(this.conferenceId).subscribe({
        next: () => this.router.navigate(['/conferences']),
        error: (err) => console.error('Error deleting conference', err)
      });
    }
  }
}

