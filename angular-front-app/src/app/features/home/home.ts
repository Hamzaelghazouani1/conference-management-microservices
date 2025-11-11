import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KeynoteService } from '../keynotes/services/keynote';
import { ConferenceService } from '../conferences/services/conference';
import { Keynote, Conference } from '../../core/models';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private readonly keynoteService = inject(KeynoteService);
  private readonly conferenceService = inject(ConferenceService);

  // Signals for state management
  protected readonly keynotes = signal<Keynote[]>([]);
  protected readonly conferences = signal<Conference[]>([]);
  protected readonly loading = signal<boolean>(true);

  // Computed values
  protected readonly keynoteCount = computed(() => this.keynotes().length);
  protected readonly conferenceCount = computed(() => this.conferences().length);
  protected readonly totalInscrits = computed(() => 
    this.conferences().reduce((sum, c) => sum + (c.nombreInscrits || 0), 0)
  );

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);

    this.keynoteService.getAll().subscribe({
      next: (data) => this.keynotes.set(data),
      error: (err) => console.error('Error loading keynotes:', err)
    });

    this.conferenceService.getAll().subscribe({
      next: (data) => {
        this.conferences.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading conferences:', err);
        this.loading.set(false);
      }
    });
  }
}
