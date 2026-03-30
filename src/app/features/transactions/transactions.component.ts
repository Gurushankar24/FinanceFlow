import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseService } from '../../core/services/expense.service';
import { ExpenseRowComponent } from '../../shared/components/expense-row/expense-row.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MONTHS } from '../../shared/constants/months';
import { CATEGORIES } from '../../shared/constants/categories';
import { Expense } from '../../core/models/expense.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ExpenseRowComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private dialog = inject(MatDialog);

  categories = CATEGORIES;
  months = MONTHS;

  // Filter state as signals
  selectedCategory = signal<string>('All');
  selectedMonth = signal<number>(new Date().getMonth() + 1);
  selectedYear = signal<number>(new Date().getFullYear());

  // Computed filtered expenses
  filteredExpenses = computed(() => {
    const expenses = this.expenseService.expenses();
    const category = this.selectedCategory();
    const month = this.selectedMonth();
    const year = this.selectedYear();

    let filtered = expenses;

    if (category !== 'All') {
      filtered = filtered.filter((e) => e.category === category);
    }

    filtered = filtered.filter((e) => {
      const [eYear, eMonth] = e.date.split('-').map(Number);
      return eYear === year && eMonth === month;
    });

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  ngOnInit(): void {}

  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
  }

  onMonthChange(month: number): void {
    this.selectedMonth.set(month);
  }

  onDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Expense',
        message: 'Are you sure you want to delete this expense?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.expenseService.deleteExpense(id);
      }
    });
  }
}
