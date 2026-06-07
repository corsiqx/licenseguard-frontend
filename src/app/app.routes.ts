import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/pages/home/home').then((m) => m.Home) },
  {
    path: 'auslastung',
    loadComponent: () =>
      import('./components/pages/auslastung/auslastung').then((m) => m.Auslastung),
  },
  {
    path: 'audits',
    loadComponent: () => import('./components/pages/audits/audits').then((m) => m.Audits),
  },
  {
    path: 'custom-reports',
    loadComponent: () =>
      import('./components/pages/custom-reports/custom-reports').then((m) => m.CustomReports),
  },
  {
    path: 'alle-lizenzen',
    loadComponent: () =>
      import('./components/pages/alle-lizenzen/alle-lizenzen').then((m) => m.AlleLizenzen),
  },
  {
    path: 'anbieter',
    loadComponent: () => import('./components/pages/anbieter/anbieter').then((m) => m.Anbieter),
  },
  {
    path: 'zuweisungen',
    loadComponent: () =>
      import('./components/pages/zuweisungen/zuweisungen').then((m) => m.Zuweisungen),
  },
  { path: '**', redirectTo: '' },
];
