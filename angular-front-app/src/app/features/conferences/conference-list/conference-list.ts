import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ConferenceService } from '../services/conference';
import { KeynoteService } from '../../keynotes/services/keynote';
import { Conference, ConferenceRequest, ConferenceType, Keynote } from '../../../core/models';

@Component({
  selector: 'app-conference-list',
  imports: [FormsModule, RouterLink, DecimalPipe],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css'
})
export class ConferenceList implements OnInit {
  private readonly conferenceService = inject(ConferenceService);
  private readonly keynoteService = inject(KeynoteService);

  // Signals for state management
  protected readonly conferences = signal<Conference[]>([]);
  protected readonly keynotes = signal<Keynote[]>([]);
  protected readonly loading = signal<boolean>(true);
  protected readonly showModal = signal<boolean>(false);
  protected readonly editingConference = signal<Conference | null>(null);
  protected readonly errorMessage = signal<string>('');
  protected readonly successMessage = signal<string>('');
  protected readonly searchTerm = signal<string>('');
  protected readonly filterType = signal<string>('');

  // Form model
  protected conferenceForm: ConferenceRequest = {
    titre: '',
    type: 'ACADEMIQUE',
    date: '',
    duree: 60,
    nombreInscrits: 0,
    keynoteId: 0
  };

  ngOnInit(): void {
    this.loadConferences();
    this.loadKeynotes();
  }

  loadConferences(): void {
    this.loading.set(true);
    this.conferenceService.getAll().subscribe({
      next: (data) => {
        this.conferences.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Erreur lors du chargement des conférences');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  loadKeynotes(): void {
    this.keynoteService.getAll().subscribe({
      next: (data) => this.keynotes.set(data),
      error: (err) => console.error(err)
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.search();
  }

  search(): void {
    const term = this.searchTerm();
    if (term.trim() === '') {
      this.loadConferences();
    } else {
      this.conferenceService.searchByTitre(term).subscribe({
        next: (data) => this.conferences.set(data),
        error: (err) => console.error(err)
      });
    }
  }

  onFilterChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filterType.set(select.value);
    this.filterByType();
  }

  filterByType(): void {
    const type = this.filterType();
    if (type === '') {
      this.loadConferences();
    } else {
      this.conferenceService.getByType(type as ConferenceType).subscribe({
        next: (data) => this.conferences.set(data),
        error: (err) => console.error(err)
      });
    }
  }

  getStars(score: number): number[] {
    return Array(Math.round(score || 0)).fill(0);
  }

  openModal(): void {
    this.editingConference.set(null);
    this.conferenceForm = {
      titre: '',
      type: 'ACADEMIQUE',
      date: '',
      duree: 60,
      nombreInscrits: 0,
      keynoteId: 0
    };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingConference.set(null);
  }

  editConference(conference: Conference): void {
    this.editingConference.set(conference);
    this.conferenceForm = {
      titre: conference.titre,
      type: conference.type,
      date: conference.date,
      duree: conference.duree,
      nombreInscrits: conference.nombreInscrits,
      keynoteId: conference.keynoteId
    };
    this.showModal.set(true);
  }

  saveConference(): void {
    const editing = this.editingConference();

    if (editing) {
      this.conferenceService.update(editing.id, this.conferenceForm).subscribe({
        next: () => {
          this.successMessage.set('Conférence mise à jour avec succès');
          this.loadConferences();
          this.closeModal();
          this.clearMessages();
        },
        error: (err) => {
          this.errorMessage.set('Erreur lors de la mise à jour');
          console.error(err);
        }
      });
    } else {
      this.conferenceService.create(this.conferenceForm).subscribe({
        next: () => {
          this.successMessage.set('Conférence créée avec succès');
          this.loadConferences();
          this.closeModal();
          this.clearMessages();
        },
        error: (err) => {
          this.errorMessage.set('Erreur lors de la création');
          console.error(err);
        }
      });
    }
  }

  deleteConference(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette conférence ?')) {
      this.conferenceService.delete(id).subscribe({
        next: () => {
          this.successMessage.set('Conférence supprimée avec succès');
          this.loadConferences();
          this.clearMessages();
        },
        error: (err) => {
          this.errorMessage.set('Erreur lors de la suppression');
          console.error(err);
        }
      });
    }
  }

  clearError(): void {
    this.errorMessage.set('');
  }

  clearSuccess(): void {
    this.successMessage.set('');
  }

  private clearMessages(): void {
    setTimeout(() => {
      this.errorMessage.set('');
      this.successMessage.set('');
    }, 3000);
  }
}
