import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../../core/models/expense.model';
import { CATEGORIES, Category } from '../../../shared/constants/categories';

@Component({
  selector: 'app-expense-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-row.component.html',
  styleUrl: './expense-row.component.css',
})
export class ExpenseRowComponent implements OnInit {
  @Input({ required: true }) expense!: Expense;
  
  categoryInfo: Category | undefined;

  ngOnInit(): void {
    this.categoryInfo = CATEGORIES.find(c => c.name === this.expense.category);
  }
}
