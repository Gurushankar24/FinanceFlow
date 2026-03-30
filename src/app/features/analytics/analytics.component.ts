import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { ExpenseService } from '../../core/services/expense.service';
import { CATEGORIES } from '../../shared/constants/categories';
import { MONTHS } from '../../shared/constants/months';

interface CategorySummary {
  name: string;
  icon: string;
  budgeted: number;
  spent: number;
  diff: number;
}

// Register Chart.js modules
Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatFormFieldModule, 
    MatSelectModule, 
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    BaseChartDirective
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  private expenseService = inject(ExpenseService);

  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  months = MONTHS;

  hasExpenses: boolean = false;

  // Bar Chart Data
  public barChartOptions: ChartConfiguration['options'] = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Spent', backgroundColor: [] }],
  };

  // Line Chart Data
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Cumulative Spending',
        fill: true,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        tension: 0.4,
      },
    ],
  };

  summaryTable: CategorySummary[] = [];

  ngOnInit(): void {
    this.updateAnalytics();
  }

  onFilterChange(): void {
    this.updateAnalytics();
  }

  updateAnalytics(): void {
    const profile = this.expenseService.getProfile();
    const spentByCategory = this.expenseService.getTotalSpentByCategory(
      this.selectedMonth,
      this.selectedYear
    );
    const expenses = this.expenseService.getExpensesByMonth(this.selectedMonth, this.selectedYear);

    this.hasExpenses = expenses.length > 0;
    if (!this.hasExpenses) return;

    // 1. Prepare Bar Chart
    this.barChartData.labels = CATEGORIES.map((c) => c.name);
    this.barChartData.datasets[0].data = CATEGORIES.map((c) => spentByCategory[c.name] || 0);
    this.barChartData.datasets[0].backgroundColor = CATEGORIES.map((c) => c.color);

    // 2. Prepare Line Chart (Cumulative)
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
    const dailyData = new Array(daysInMonth).fill(0);
    
    expenses.forEach((e) => {
      const day = parseInt(e.date.split('-')[2]);
      dailyData[day - 1] += e.amount;
    });

    let cumulativeSum = 0;
    const cumulativeData = dailyData.map((amount) => {
      cumulativeSum += amount;
      return cumulativeSum;
    });

    this.lineChartData.labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    this.lineChartData.datasets[0].data = cumulativeData;

    // 3. Prepare Summary Table
    this.summaryTable = CATEGORIES.map((cat) => {
      const budgeted = profile?.budgets[cat.name] || 0;
      const spent = spentByCategory[cat.name] || 0;
      return {
        name: cat.name,
        icon: cat.icon,
        budgeted,
        spent,
        diff: budgeted - spent,
      };
    });

    // Force chart refresh
    this.barChartData = { ...this.barChartData };
    this.lineChartData = { ...this.lineChartData };
  }
}
