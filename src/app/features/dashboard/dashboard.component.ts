import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseService } from '../../core/services/expense.service';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { CategoryBarComponent } from '../../shared/components/category-bar/category-bar.component';
import { CATEGORIES } from '../../shared/constants/categories';
import { UserProfile } from '../../core/models/profile.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private router = inject(Router);

  profile = signal<UserProfile | null>(null);
  categories = CATEGORIES;
  
  // Computed dashboard data
  dashboardData = computed(() => {
    const expenses = this.expenseService.expenses();
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const income = this.profile()?.salary || 0;

    const monthlyExpenses = expenses.filter((e) => {
      const [eYear, eMonth] = e.date.split('-').map(Number);
      return eYear === year && eMonth === month;
    });

    const hasExpenses = monthlyExpenses.length > 0;
    const totalSpent = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalSaved = Math.max(0, income - totalSpent);
    const healthScore = this.expenseService.getHealthScore(month, year);
    
    // Calculate spentByCategory manually here to be fully reactive to the signal
    const spentByCategory = monthlyExpenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as { [key: string]: number });

    return {
      totalIncome: income,
      totalSpent,
      totalSaved,
      healthScore,
      spentByCategory,
      hasExpenses
    };
  });

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  ngOnInit(): void {
    const profileData = this.expenseService.getProfile();
    if (!profileData) {
      this.router.navigate(['/setup']);
      return;
    }
    
    this.profile.set(profileData);
  }
}
