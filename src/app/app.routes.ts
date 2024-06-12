import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'categories',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./categories/categories.component'),
  },
  {
    path: 'categories/:id',
    loadComponent: () => import('./category-detail/category-detail.component'),
  },
  {
    path: 'restaurants',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./restaurants/restaurants.component'),
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
];
