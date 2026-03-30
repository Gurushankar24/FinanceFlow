import { Injectable, inject, signal, computed } from '@angular/core';
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

  // Signals for state management
  private profileSignal = signal<UserProfile | null>(this.storage.getItem<UserProfile>(this.PROFILE_KEY));
  private expensesSignal = signal<Expense[]>(this.storage.getItem<Expense[]>(this.EXPENSES_KEY) || []);

  // Public accessors
  profile = this.profileSignal.asReadonly();
  expenses = this.expensesSignal.asReadonly();

  getProfile(): UserProfile | null {
    return this.profileSignal();
  }

  saveProfile(profile: UserProfile): void {
    this.storage.setItem(this.PROFILE_KEY, profile);
    this.profileSignal.set(profile);
  }

  getExpenses(): Expense[] {
    return this.expensesSignal();
  }

  addExpense(expense: Expense): void {
    const updatedExpenses = [...this.expensesSignal(), expense];
    this.storage.setItem(this.EXPENSES_KEY, updatedExpenses);
    this.expensesSignal.set(updatedExpenses);
  }

  deleteExpense(id: string): void {
    const updatedExpenses = this.expensesSignal().filter((e) => e.id !== id);
    this.storage.setItem(this.EXPENSES_KEY, updatedExpenses);
    this.expensesSignal.set(updatedExpenses);
  }

  getExpensesByMonth(month: number, year: number): Expense[] {
    return this.expensesSignal().filter((e) => {
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

    const penalty = 100 / CATEGORIES.length;
    return Math.max(0, Math.round(100 - overBudgetCount * penalty));
  }
}
