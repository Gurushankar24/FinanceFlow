import { Component, OnInit, inject } from '@angular/core';
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
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, StatCardComponent, CategoryBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private router = inject(Router);

  profile: UserProfile | null = null;
  categories = CATEGORIES;
  
  totalIncome: number = 0;
  totalSpent: number = 0;
  totalSaved: number = 0;
  
  spentByCategory: { [key: string]: number } = {};
  hasExpenses: boolean = false;

  ngOnInit(): void {
    const profileData = this.expenseService.getProfile();
    if (!profileData) {
      this.router.navigate(['/setup']);
      return;
    }
    
    this.profile = profileData;
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    this.totalIncome = this.profile?.salary || 0;

    const monthlyExpenses = this.expenseService.getExpensesByMonth(month, year);
    this.hasExpenses = monthlyExpenses.length > 0;
    this.totalSpent = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    this.totalSaved = Math.max(0, this.totalIncome - this.totalSpent);

    this.spentByCategory = this.expenseService.getTotalSpentByCategory(month, year);
  }
  get greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
}
