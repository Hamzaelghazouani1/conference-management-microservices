import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Keynote, KeynoteRequest } from '../../../core/models';
import { environment } from '../../../../environments/environment';

/**
 * Keynote Service
 * Direct HTTP communication with Keynote Service
 */
@Injectable({
  providedIn: 'root'
})
export class KeynoteService {
  private readonly http = inject(HttpClient);
  // Use direct URL in development, Gateway in production
  private readonly baseUrl = (environment as any).keynoteApiUrl || `${environment.apiUrl}/keynote-service`;
  private readonly basePath = `${this.baseUrl}/api/keynotes`;

  /**
   * Get all keynotes
   */
  getAll(): Observable<Keynote[]> {
    return this.http.get<Keynote[]>(this.basePath);
  }

  /**
   * Get keynote by ID
   */
  getById(id: number): Observable<Keynote> {
    return this.http.get<Keynote>(`${this.basePath}/${id}`);
  }

  /**
   * Get keynote by email
   */
  getByEmail(email: string): Observable<Keynote> {
    return this.http.get<Keynote>(`${this.basePath}/email/${email}`);
  }

  /**
   * Create new keynote
   */
  create(keynote: KeynoteRequest): Observable<Keynote> {
    return this.http.post<Keynote>(this.basePath, keynote);
  }

  /**
   * Update keynote
   */
  update(id: number, keynote: KeynoteRequest): Observable<Keynote> {
    return this.http.put<Keynote>(`${this.basePath}/${id}`, keynote);
  }

  /**
   * Delete keynote
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Search by name
   */
  searchByNom(nom: string): Observable<Keynote[]> {
    return this.http.get<Keynote[]>(`${this.basePath}/search/nom`, { params: { nom } });
  }

  /**
   * Search by function
   */
  searchByFonction(fonction: string): Observable<Keynote[]> {
    return this.http.get<Keynote[]>(`${this.basePath}/search/fonction`, { params: { fonction } });
  }
}
