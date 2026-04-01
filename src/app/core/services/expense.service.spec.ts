import { TestBed } from '@angular/core/testing';
import { ExpenseService } from './expense.service';
import { StorageService } from './storage.service';
import { UserProfile } from '../models/profile.model';
import { Expense } from '../models/expense.model';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let storageServiceSpy: any;

  const mockProfile: UserProfile = {
    name: 'Test User',
    salary: 50000,
    budgets: {
      'Food': 5000,
      'Transport': 2000
    }
  };

  const mockExpenses: Expense[] = [
    { id: '1', category: 'Food', amount: 500, date: '2026-03-01', note: 'Dinner' },
    { id: '2', category: 'Food', amount: 300, date: '2026-03-05', note: 'Lunch' },
    { id: '3', category: 'Transport', amount: 1000, date: '2026-03-10', note: 'Gas' }
  ];

  beforeEach(() => {
    storageServiceSpy = {
      getItem: vi.fn((key: string) => {
        if (key === 'financeflow_profile') return mockProfile;
        if (key === 'financeflow_expenses') return mockExpenses;
        return null;
      }),
      setItem: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ExpenseService,
        { provide: StorageService, useValue: storageServiceSpy }
      ]
    });
    service = TestBed.inject(ExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get profile from storage', () => {
    const profile = service.getProfile();
    expect(profile).toEqual(mockProfile);
    expect(storageServiceSpy.getItem).toHaveBeenCalledWith('financeflow_profile');
  });

  it('should add an expense', () => {
    const newExpense: Expense = { id: '4', category: 'Food', amount: 200, date: '2026-03-15', note: 'Snack' };
    service.addExpense(newExpense);
    
    expect(service.getExpenses().length).toBe(4);
    expect(storageServiceSpy.setItem).toHaveBeenCalledWith('financeflow_expenses', expect.arrayContaining([newExpense]));
  });

  it('should filter expenses by month and year', () => {
    const filtered = service.getExpensesByMonth(3, 2026);
    expect(filtered.length).toBe(3);
    
    const none = service.getExpensesByMonth(4, 2026);
    expect(none.length).toBe(0);
  });

  it('should calculate total spent by category', () => {
    const totals = service.getTotalSpentByCategory(3, 2026);
    expect(totals['Food']).toBe(800);
    expect(totals['Transport']).toBe(1000);
  });

  it('should calculate remaining budget', () => {
    const remaining = service.getRemainingBudget('Food', 3, 2026);
    expect(remaining).toBe(4200); // 5000 - 800
  });

  it('should calculate health score correctly', () => {
    // Current spent: Food 800/5000 (ok), Transport 1000/2000 (ok)
    // Score should be 100 since no category is over budget
    const score = service.getHealthScore(3, 2026);
    expect(score).toBe(100);
  });
});
