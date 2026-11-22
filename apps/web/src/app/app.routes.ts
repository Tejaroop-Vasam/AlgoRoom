import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthSessionService } from './services/auth-session.service';
import { RoomHostSessionService } from './services/room-host-session.service';

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
    path: 'room/:code',
    canActivate: [route => {
      const code = route.paramMap.get('code') ?? '';
      if (inject(RoomHostSessionService).get(code) || inject(AuthSessionService).accessToken()) {
        return true;
      }
      return inject(Router).createUrlTree(['/'], { queryParams: { join: code } });
    }],
    loadComponent: () => import('./features/room-lobby/room-lobby.component').then(m => m.RoomLobbyComponent),
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
