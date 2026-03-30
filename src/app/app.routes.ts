import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'setup',
    loadComponent: () =>
      import('./features/setup/setup.component').then((m) => m.SetupComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'add-expense',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/add-expense/add-expense.component').then(
        (m) => m.AddExpenseComponent,
      ),
  },
  {
    path: 'transactions',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/transactions/transactions.component').then(
        (m) => m.TransactionsComponent,
      ),
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/analytics/analytics.component').then((m) => m.AnalyticsComponent),
  },
  {
    path: 'summary',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/summary/summary.component').then((m) => m.SummaryComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
