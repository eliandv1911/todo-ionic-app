// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./presentation/pages/tasks/tasks.page').then((m) => m.TasksPage),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./presentation/pages/categories/categories.page').then((m) => m.CategoriesPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
