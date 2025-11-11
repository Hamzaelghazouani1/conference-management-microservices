import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeynoteService } from '../services/keynote';
import { Keynote, KeynoteRequest } from '../../../core/models';

@Component({
  selector: 'app-keynote-list',
  imports: [FormsModule],
  templateUrl: './keynote-list.html',
  styleUrl: './keynote-list.css'
})
export class KeynoteList implements OnInit {
  private readonly keynoteService = inject(KeynoteService);

  // Signals for state management
  protected readonly keynotes = signal<Keynote[]>([]);
  protected readonly loading = signal<boolean>(true);
  protected readonly showModal = signal<boolean>(false);
  protected readonly editingKeynote = signal<Keynote | null>(null);
  protected readonly errorMessage = signal<string>('');
  protected readonly successMessage = signal<string>('');
  protected readonly searchTerm = signal<string>('');

  // Form model
  protected keynoteForm: KeynoteRequest = {
    nom: '',
    prenom: '',
    email: '',
    fonction: ''
  };

  ngOnInit(): void {
    this.loadKeynotes();
  }

  loadKeynotes(): void {
    this.loading.set(true);
    this.keynoteService.getAll().subscribe({
      next: (data) => {
        this.keynotes.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Erreur lors du chargement des keynotes');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  search(): void {
    const term = this.searchTerm();
    if (term.trim() === '') {
      this.loadKeynotes();
    } else {
      this.keynoteService.searchByNom(term).subscribe({
        next: (data) => this.keynotes.set(data),
        error: (err) => console.error(err)
      });
    }
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.search();
  }

  openModal(): void {
    this.editingKeynote.set(null);
    this.keynoteForm = { nom: '', prenom: '', email: '', fonction: '' };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingKeynote.set(null);
  }

  editKeynote(keynote: Keynote): void {
    this.editingKeynote.set(keynote);
    this.keynoteForm = {
      nom: keynote.nom,
      prenom: keynote.prenom,
      email: keynote.email,
      fonction: keynote.fonction
    };
    this.showModal.set(true);
  }

  saveKeynote(): void {
    const editing = this.editingKeynote();
    
    if (editing) {
      this.keynoteService.update(editing.id, this.keynoteForm).subscribe({
        next: () => {
          this.successMessage.set('Keynote mis à jour avec succès');
          this.loadKeynotes();
          this.closeModal();
          this.clearMessages();
        },
        error: (err) => {
          this.errorMessage.set('Erreur lors de la mise à jour');
          console.error(err);
        }
      });
    } else {
      this.keynoteService.create(this.keynoteForm).subscribe({
        next: () => {
          this.successMessage.set('Keynote créé avec succès');
          this.loadKeynotes();
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

  deleteKeynote(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce keynote ?')) {
      this.keynoteService.delete(id).subscribe({
        next: () => {
          this.successMessage.set('Keynote supprimé avec succès');
          this.loadKeynotes();
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
