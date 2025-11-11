import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'keynotes',
    loadComponent: () => import('./features/keynotes/keynote-list/keynote-list').then(m => m.KeynoteList)
  },
  {
    path: 'conferences',
    loadComponent: () => import('./features/conferences/conference-list/conference-list').then(m => m.ConferenceList)
  },
  {
    path: 'conferences/:id',
    loadComponent: () => import('./features/conferences/conference-detail/conference-detail').then(m => m.ConferenceDetail)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
