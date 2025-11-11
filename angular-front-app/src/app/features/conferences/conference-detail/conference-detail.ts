import { Component, inject, OnInit, signal, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ConferenceService } from '../services/conference';
import { Conference, ReviewRequest } from '../../../core/models';

@Component({
  selector: 'app-conference-detail',
  imports: [RouterLink, FormsModule, DecimalPipe],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css'
})
export class ConferenceDetail implements OnInit {
  private readonly conferenceService = inject(ConferenceService);
  private readonly router = inject(Router);

  // Route input (using new input() function)
  readonly id = input.required<string>();

  // Signals for state management
  protected readonly conference = signal<Conference | null>(null);
  protected readonly loading = signal<boolean>(true);
  protected readonly errorMessage = signal<string>('');
  protected readonly showReviewForm = signal<boolean>(false);

  // Form model
  protected reviewForm: ReviewRequest = {
    texte: '',
    note: 5
  };

  protected stars = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.loadConference();
  }

  loadConference(): void {
    const conferenceId = Number(this.id());
    this.loading.set(true);

    this.conferenceService.getById(conferenceId).subscribe({
      next: (data) => {
        this.conference.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Erreur lors du chargement de la conférence');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  getStars(score: number): number[] {
    return Array(Math.round(score || 0)).fill(0);
  }

  toggleReviewForm(): void {
    this.showReviewForm.update(v => !v);
  }

  setRating(rating: number): void {
    this.reviewForm.note = rating;
  }

  addReview(): void {
    if (!this.reviewForm.texte.trim()) {
      return;
    }

    const conferenceId = Number(this.id());
    this.conferenceService.addReview(conferenceId, this.reviewForm).subscribe({
      next: (data) => {
        this.conference.set(data);
        this.showReviewForm.set(false);
        this.reviewForm = { texte: '', note: 5 };
      },
      error: (err) => {
        console.error('Error adding review:', err);
      }
    });
  }

  deleteReview(reviewId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette review ?')) {
      const conferenceId = Number(this.id());
      this.conferenceService.deleteReview(conferenceId, reviewId).subscribe({
        next: () => this.loadConference(),
        error: (err) => console.error('Error deleting review:', err)
      });
    }
  }

  deleteConference(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette conférence ?')) {
      const conferenceId = Number(this.id());
      this.conferenceService.delete(conferenceId).subscribe({
        next: () => this.router.navigate(['/conferences']),
        error: (err) => console.error('Error deleting conference:', err)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/conferences']);
  }
}
