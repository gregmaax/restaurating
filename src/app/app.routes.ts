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
    data: { title: 'Catégories' },
  },
  {
    path: 'categories/:id',
    loadComponent: () => import('./category-detail/category-detail.component'),
    data: { title: 'Catégories' },
  },
  {
    path: 'restaurants',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./restaurants/restaurants.component'),
    data: { title: 'Restaurants' },
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
];
