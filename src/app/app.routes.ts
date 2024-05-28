import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories.component'),
  },
  {
    path: 'category/:id',
    loadComponent: () => import('./category-detail/category-detail.component'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
