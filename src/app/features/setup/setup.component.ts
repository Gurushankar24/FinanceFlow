import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ExpenseService } from '../../core/services/expense.service';
import { CATEGORIES } from '../../shared/constants/categories';
import { UserProfile } from '../../core/models/profile.model';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css',
})
export class SetupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);
  private router = inject(Router);

  setupForm!: FormGroup;
  categories = CATEGORIES;
  isEditMode = false;

  ngOnInit(): void {
    this.initForm();
    this.checkAndPatchProfile();
  }

  private initForm(): void {
    const budgetGroup: { [key: string]: any } = {};
    this.categories.forEach((cat) => {
      budgetGroup[cat.name] = [null, [Validators.required, Validators.min(0)]];
    });

    this.setupForm = this.fb.group({
      salary: [null, [Validators.required, Validators.min(1)]],
      budgets: this.fb.group(budgetGroup),
    });
  }

  private checkAndPatchProfile(): void {
    const profile = this.expenseService.getProfile();
    if (profile) {
      this.isEditMode = true;
      this.setupForm.patchValue(profile);
    }
  }

  onSubmit(): void {
    if (this.setupForm.valid) {
      const profile: UserProfile = this.setupForm.value;
      this.expenseService.saveProfile(profile);
      this.router.navigate(['/dashboard']);
    }
  }
}
