import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Expense } from '../models/expense.model';
import { UserProfile } from '../models/profile.model';
import { CATEGORIES } from '../../shared/constants/categories';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private storage = inject(StorageService);
  private readonly PROFILE_KEY = 'financeflow_profile';
  private readonly EXPENSES_KEY = 'financeflow_expenses';

  getProfile(): UserProfile | null {
    return this.storage.getItem<UserProfile>(this.PROFILE_KEY);
  }

  saveProfile(profile: UserProfile): void {
    this.storage.setItem(this.PROFILE_KEY, profile);
  }

  getExpenses(): Expense[] {
    return this.storage.getItem<Expense[]>(this.EXPENSES_KEY) || [];
  }

  addExpense(expense: Expense): void {
    const expenses = this.getExpenses();
    expenses.push(expense);
    this.storage.setItem(this.EXPENSES_KEY, expenses);
  }

  deleteExpense(id: string): void {
    const expenses = this.getExpenses().filter((e) => e.id !== id);
    this.storage.setItem(this.EXPENSES_KEY, expenses);
  }

  getExpensesByMonth(month: number, year: number): Expense[] {
    return this.getExpenses().filter((e) => {
      const [eYear, eMonth] = e.date.split('-').map(Number);
      return eYear === year && eMonth === month;
    });
  }

  getTotalSpentByCategory(month: number, year: number): { [key: string]: number } {
    const monthlyExpenses = this.getExpensesByMonth(month, year);
    return monthlyExpenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as { [key: string]: number });
  }

  getRemainingBudget(category: string, month: number, year: number): number {
    const profile = this.getProfile();
    if (!profile || !profile.budgets[category]) return 0;

    const spentByCategory = this.getTotalSpentByCategory(month, year);
    const spent = spentByCategory[category] || 0;
    return profile.budgets[category] - spent;
  }

  getHealthScore(month: number, year: number): number {
    const profile = this.getProfile();
    if (!profile || profile.salary <= 0) return 0;

    const spentByCategory = this.getTotalSpentByCategory(month, year);
    let overBudgetCount = 0;

    CATEGORIES.forEach((cat) => {
      const limit = profile.budgets[cat.name] || 0;
      const spent = spentByCategory[cat.name] || 0;
      if (spent > limit) {
        overBudgetCount++;
      }
    });

    // Score starts at 100, subtract points per category over budget.
    // Assuming 100 / number of categories (8) = 12.5 points each.
    const penalty = 100 / CATEGORIES.length;
    return Math.max(0, Math.round(100 - overBudgetCount * penalty));
  }
}
