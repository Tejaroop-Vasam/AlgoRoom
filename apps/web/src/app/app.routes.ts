import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'test',
    loadComponent: () => import('./features/component-test/component-test.component').then(m => m.ComponentTest),
  },
  {
    path: 'problem/:id',
    loadComponent: () =>
      import('./features/problem-workspace/problem-workspace.component').then(
        m => m.ProblemWorkspaceComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
