import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conference, ConferenceRequest, ConferenceType, ReviewRequest } from '../models/conference.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  private apiUrl = `${environment.gatewayUrl}/conference-service/api/conferences`;

  constructor(private http: HttpClient) {}

  getAllConferences(): Observable<Conference[]> {
    return this.http.get<Conference[]>(this.apiUrl);
  }

  getConferenceById(id: number): Observable<Conference> {
    return this.http.get<Conference>(`${this.apiUrl}/${id}`);
  }

  createConference(conference: ConferenceRequest): Observable<Conference> {
    return this.http.post<Conference>(this.apiUrl, conference);
  }

  updateConference(id: number, conference: ConferenceRequest): Observable<Conference> {
    return this.http.put<Conference>(`${this.apiUrl}/${id}`, conference);
  }

  deleteConference(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getConferencesByType(type: ConferenceType): Observable<Conference[]> {
    return this.http.get<Conference[]>(`${this.apiUrl}/type/${type}`);
  }

  getConferencesByKeynoteId(keynoteId: number): Observable<Conference[]> {
    return this.http.get<Conference[]>(`${this.apiUrl}/keynote/${keynoteId}`);
  }

  searchByTitre(titre: string): Observable<Conference[]> {
    return this.http.get<Conference[]>(`${this.apiUrl}/search?titre=${titre}`);
  }

  addReview(conferenceId: number, review: ReviewRequest): Observable<Conference> {
    return this.http.post<Conference>(`${this.apiUrl}/${conferenceId}/reviews`, review);
  }

  deleteReview(conferenceId: number, reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${conferenceId}/reviews/${reviewId}`);
  }
}

