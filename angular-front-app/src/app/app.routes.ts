import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'keynotes', 
    loadComponent: () => import('./components/keynotes/keynote-list/keynote-list.component').then(m => m.KeynoteListComponent)
  },
  { 
    path: 'conferences', 
    loadComponent: () => import('./components/conferences/conference-list/conference-list.component').then(m => m.ConferenceListComponent)
  },
  { 
    path: 'conferences/:id', 
    loadComponent: () => import('./components/conferences/conference-detail/conference-detail.component').then(m => m.ConferenceDetailComponent)
  }
];

