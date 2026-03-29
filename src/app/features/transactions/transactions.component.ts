import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseService } from '../../core/services/expense.service';
import { ExpenseRowComponent } from '../../shared/components/expense-row/expense-row.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
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
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private dialog = inject(MatDialog);

  categories = CATEGORIES;
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];

  selectedCategory: string = 'All';
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();

  filteredExpenses: Expense[] = [];

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    let expenses = this.expenseService.getExpenses();

    // Filter by Category
    if (this.selectedCategory !== 'All') {
      expenses = expenses.filter((e) => e.category === this.selectedCategory);
    }

    // Filter by Month and Year
    expenses = expenses.filter((e) => {
      const [eYear, eMonth] = e.date.split('-').map(Number);
      return eYear === this.selectedYear && eMonth === this.selectedMonth;
    });

    // Sort by Date (newest first)
    this.filteredExpenses = expenses.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  onFilterChange(): void {
    this.loadExpenses();
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
        this.loadExpenses();
      }
    });
  }
}
