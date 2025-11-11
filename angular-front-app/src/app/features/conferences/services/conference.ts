import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conference, ConferenceRequest, ConferenceType, ReviewRequest } from '../../../core/models';
import { environment } from '../../../../environments/environment';

/**
 * Conference Service
 * Direct HTTP communication with Conference Service
 */
@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  private readonly http = inject(HttpClient);
  // Use direct URL in development, Gateway in production
  private readonly baseUrl = (environment as any).conferenceApiUrl || `${environment.apiUrl}/conference-service`;
  private readonly basePath = `${this.baseUrl}/api/conferences`;

  /**
   * Get all conferences
   */
  getAll(): Observable<Conference[]> {
    return this.http.get<Conference[]>(this.basePath);
  }

  /**
   * Get conference by ID
   */
  getById(id: number): Observable<Conference> {
    return this.http.get<Conference>(`${this.basePath}/${id}`);
  }

  /**
   * Create new conference
   */
  create(conference: ConferenceRequest): Observable<Conference> {
    return this.http.post<Conference>(this.basePath, conference);
  }

  /**
   * Update conference
   */
  update(id: number, conference: ConferenceRequest): Observable<Conference> {
    return this.http.put<Conference>(`${this.basePath}/${id}`, conference);
  }

  /**
   * Delete conference
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Get conferences by type
   */
  getByType(type: ConferenceType): Observable<Conference[]> {
    return this.http.get<Conference[]>(`${this.basePath}/type/${type}`);
  }

  /**
   * Get conferences by keynote ID
   */
  getByKeynoteId(keynoteId: number): Observable<Conference[]> {
    return this.http.get<Conference[]>(`${this.basePath}/keynote/${keynoteId}`);
  }

  /**
   * Search by title
   */
  searchByTitre(titre: string): Observable<Conference[]> {
    return this.http.get<Conference[]>(`${this.basePath}/search`, { params: { titre } });
  }

  /**
   * Add review to conference
   */
  addReview(conferenceId: number, review: ReviewRequest): Observable<Conference> {
    return this.http.post<Conference>(`${this.basePath}/${conferenceId}/reviews`, review);
  }

  /**
   * Delete review from conference
   */
  deleteReview(conferenceId: number, reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${conferenceId}/reviews/${reviewId}`);
  }
}
