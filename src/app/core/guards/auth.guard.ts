import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';

export const authGuard: CanActivateFn = () => {
  const expenseService = inject(ExpenseService);
  const router = inject(Router);
  return expenseService.getProfile() ? true : router.createUrlTree(['/setup']);
};
