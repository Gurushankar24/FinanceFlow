import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-category-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './category-bar.component.html',
  styleUrl: './category-bar.component.css',
})
export class CategoryBarComponent implements OnInit {
  @Input({ required: true }) categoryName: string = '';
  @Input({ required: true }) spentAmount: number = 0;
  @Input({ required: true }) budgetLimit: number = 0;

  percentage: number = 0;
  status: 'success' | 'warning' | 'danger' = 'success';

  ngOnInit(): void {
    this.calculateStatus();
  }

  private calculateStatus(): void {
    if (this.budgetLimit > 0) {
      this.percentage = (this.spentAmount / this.budgetLimit) * 100;
    } else {
      this.percentage = this.spentAmount > 0 ? 100 : 0;
    }

    if (this.percentage < 70) {
      this.status = 'success';
    } else if (this.percentage <= 90) {
      this.status = 'warning';
    } else {
      this.status = 'danger';
    }
  }
}
