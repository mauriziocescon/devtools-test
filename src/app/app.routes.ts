import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users-routes') },
  { path: '**', redirectTo: '/users' },
];
