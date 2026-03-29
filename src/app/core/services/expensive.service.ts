import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { UserProfile } from '../models/profile.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
    constructor(private storageService: StorageService) {}
    getProfile() : UserProfile | null {
        return this.storageService.getItem<UserProfile>('financeflow_profile');
    }
    saveProfile(profile: UserProfile) : void {
        this.storageService.setItem('financeflow_profile', profile);
    }
    getExpenses() : Expense[] | null {
        return this.storageService.getItem<Expense[]>('financeflow_expenses');
    }
    addExpense(expense: Expense) : void {
        const expenses = this.getExpenses() || [];
        expenses.push(expense);
        this.storageService.setItem('financeflow_expenses', expenses);
    }
}
