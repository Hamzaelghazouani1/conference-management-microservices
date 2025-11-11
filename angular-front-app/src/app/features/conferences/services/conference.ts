import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api';
import { Conference, ConferenceRequest, ConferenceType, ReviewRequest } from '../../../core/models';

/**
 * Conference Service
 * Uses generic ApiService for HTTP communication
 */
@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  private readonly api = inject(ApiService);
  private readonly basePath = 'conference-service/api/conferences';

  /**
   * Get all conferences
   */
  getAll(): Observable<Conference[]> {
    return this.api.get<Conference[]>(this.basePath);
  }

  /**
   * Get conference by ID
   */
  getById(id: number): Observable<Conference> {
    return this.api.get<Conference>(`${this.basePath}/${id}`);
  }

  /**
   * Create new conference
   */
  create(conference: ConferenceRequest): Observable<Conference> {
    return this.api.post<Conference, ConferenceRequest>(this.basePath, conference);
  }

  /**
   * Update conference
   */
  update(id: number, conference: ConferenceRequest): Observable<Conference> {
    return this.api.put<Conference, ConferenceRequest>(`${this.basePath}/${id}`, conference);
  }

  /**
   * Delete conference
   */
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Get conferences by type
   */
  getByType(type: ConferenceType): Observable<Conference[]> {
    return this.api.get<Conference[]>(`${this.basePath}/type/${type}`);
  }

  /**
   * Get conferences by keynote ID
   */
  getByKeynoteId(keynoteId: number): Observable<Conference[]> {
    return this.api.get<Conference[]>(`${this.basePath}/keynote/${keynoteId}`);
  }

  /**
   * Search by title
   */
  searchByTitre(titre: string): Observable<Conference[]> {
    return this.api.get<Conference[]>(`${this.basePath}/search`, { titre });
  }

  /**
   * Add review to conference
   */
  addReview(conferenceId: number, review: ReviewRequest): Observable<Conference> {
    return this.api.post<Conference, ReviewRequest>(`${this.basePath}/${conferenceId}/reviews`, review);
  }

  /**
   * Delete review from conference
   */
  deleteReview(conferenceId: number, reviewId: number): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${conferenceId}/reviews/${reviewId}`);
  }
}
