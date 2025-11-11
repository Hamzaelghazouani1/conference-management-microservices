import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api';
import { Keynote, KeynoteRequest } from '../../../core/models';

/**
 * Keynote Service
 * Uses generic ApiService for HTTP communication
 */
@Injectable({
  providedIn: 'root'
})
export class KeynoteService {
  private readonly api = inject(ApiService);
  private readonly basePath = 'keynote-service/api/keynotes';

  /**
   * Get all keynotes
   */
  getAll(): Observable<Keynote[]> {
    return this.api.get<Keynote[]>(this.basePath);
  }

  /**
   * Get keynote by ID
   */
  getById(id: number): Observable<Keynote> {
    return this.api.get<Keynote>(`${this.basePath}/${id}`);
  }

  /**
   * Get keynote by email
   */
  getByEmail(email: string): Observable<Keynote> {
    return this.api.get<Keynote>(`${this.basePath}/email/${email}`);
  }

  /**
   * Create new keynote
   */
  create(keynote: KeynoteRequest): Observable<Keynote> {
    return this.api.post<Keynote, KeynoteRequest>(this.basePath, keynote);
  }

  /**
   * Update keynote
   */
  update(id: number, keynote: KeynoteRequest): Observable<Keynote> {
    return this.api.put<Keynote, KeynoteRequest>(`${this.basePath}/${id}`, keynote);
  }

  /**
   * Delete keynote
   */
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Search by name
   */
  searchByNom(nom: string): Observable<Keynote[]> {
    return this.api.get<Keynote[]>(`${this.basePath}/search/nom`, { nom });
  }

  /**
   * Search by function
   */
  searchByFonction(fonction: string): Observable<Keynote[]> {
    return this.api.get<Keynote[]>(`${this.basePath}/search/fonction`, { fonction });
  }
}
