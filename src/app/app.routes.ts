import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/pages/home/home').then((m) => m.Home) },
  {
    path: 'auslastung',
    loadComponent: () =>
      import('./components/pages/auslastung/auslastung').then((m) => m.Auslastung),
  },
  { path: '**', redirectTo: '' },
];
