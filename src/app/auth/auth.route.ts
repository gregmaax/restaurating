import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.component'),
    data: { title: 'Connexion' },
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component'),
    data: { title: 'Créer un compte' },
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
];
