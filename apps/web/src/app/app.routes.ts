import { Routes } from '@angular/router';


import { ComponentTest } from './features/component-test/component-test.component';

export const routes: Routes = [
  {
    path: 'test',
    component: ComponentTest,
  },
  {
    path: '**',
    redirectTo: 'test',
  },
];
