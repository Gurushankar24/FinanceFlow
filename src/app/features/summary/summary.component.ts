import { Component, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseService } from '../../core/services/expense.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { CATEGORIES } from '../../shared/constants/categories';
import { MONTHS } from '../../shared/constants/months';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    StatCardComponent,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent implements OnInit {
  private expenseService = inject(ExpenseService);

  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  months = MONTHS;

  totalIncome: number = 0;
  totalSpent: number = 0;
  totalSaved: number = 0;
  healthScore: number = 0;
  overBudgetCategories: any[] = [];

  constructor() {
    // Automatically re-run updateSummary whenever the expenses signal in the service changes
    effect(() => {
      this.expenseService.expenses(); // Subscribe to the signal
      this.updateSummary();
    });
  }

  ngOnInit(): void {
    this.updateSummary();
  }

  onFilterChange(): void {
    this.updateSummary();
  }

  updateSummary(): void {
    const profile = this.expenseService.getProfile();
    if (!profile) return;

    // 1. Basic Stats
    this.totalIncome = profile.salary;
    const monthlyExpenses = this.expenseService.getExpensesByMonth(this.selectedMonth, this.selectedYear);
    this.totalSpent = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    this.totalSaved = Math.max(0, this.totalIncome - this.totalSpent);

    // 2. Health Score
    this.healthScore = this.expenseService.getHealthScore(this.selectedMonth, this.selectedYear);

    // 3. Breakdown of Over-Budget Categories
    const spentByCategory = this.expenseService.getTotalSpentByCategory(this.selectedMonth, this.selectedYear);
    this.overBudgetCategories = CATEGORIES.filter((cat) => {
      const spent = spentByCategory[cat.name] || 0;
      const budget = profile.budgets[cat.name] || 0;
      return spent > budget;
    }).map((cat) => ({
      name: cat.name,
      icon: cat.icon,
      overBy: (spentByCategory[cat.name] || 0) - (profile.budgets[cat.name] || 0),
    }));
  }

  getScoreColorClass(): string {
    if (this.healthScore > 80) return 'score-green';
    if (this.healthScore >= 50) return 'score-yellow';
    return 'score-red';
  }
}
