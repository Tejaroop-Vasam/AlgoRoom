import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'test',
    loadComponent: () => import('./features/component-test/component-test.component').then(m => m.ComponentTest),
  },
  {
    path: '**',
    redirectTo: 'test',
  },
];
