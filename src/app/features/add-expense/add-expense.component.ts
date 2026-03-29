import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';

import { ExpenseService } from '../../core/services/expense.service';
import { CATEGORIES } from '../../shared/constants/categories';
import { Expense } from '../../core/models/expense.model';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css',
})
export class AddExpenseComponent implements OnInit {
  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);
  private snackBar = inject(MatSnackBar);

  expenseForm!: FormGroup;
  categories = CATEGORIES;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      date: [new Date(), Validators.required],
      note: [''],
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const formValue = this.expenseForm.value;
      
      // Convert Date object to YYYY-MM-DD string
      const dateObj = formValue.date as Date;
      const dateString = dateObj.toISOString().split('T')[0];

      const newExpense: Expense = {
        id: uuidv4(),
        category: formValue.category,
        amount: formValue.amount,
        date: dateString,
        note: formValue.note,
      };

      this.expenseService.addExpense(newExpense);
      
      this.snackBar.open('Expense added successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      this.resetForm();
    }
  }

  private resetForm(): void {
    this.expenseForm.reset({
      category: '',
      amount: null,
      date: new Date(),
      note: '',
    });
    
    // Clear validation errors after reset
    Object.keys(this.expenseForm.controls).forEach(key => {
      this.expenseForm.get(key)?.setErrors(null);
    });
  }
}
