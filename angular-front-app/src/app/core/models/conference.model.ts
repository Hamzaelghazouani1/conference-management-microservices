import { Keynote } from './keynote.model';

export type ConferenceType = 'ACADEMIQUE' | 'COMMERCIALE';

export interface Review {
  id: number;
  date: string;
  texte: string;
  note: number;
}

export interface ReviewRequest {
  texte: string;
  note: number;
}

export interface Conference {
  id: number;
  titre: string;
  type: ConferenceType;
  date: string;
  duree: number;
  nombreInscrits: number;
  score: number;
  keynoteId: number;
  keynote?: Keynote;
  reviews?: Review[];
}

export interface ConferenceRequest {
  titre: string;
  type: ConferenceType;
  date: string;
  duree: number;
  nombreInscrits: number;
  keynoteId: number;
}

