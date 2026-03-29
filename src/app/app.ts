import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs/operators';
import { ExpenseService } from './core/services/expense.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private router = inject(Router);
  private titleService = inject(Title);
  private expenseService = inject(ExpenseService);

  profile: any = null;
  showToast = false;

  ngOnInit() {
    this.profile = this.expenseService.getProfile();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url.split('/')[1] || 'Dashboard';
      const title = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
      this.titleService.setTitle(`FinanceFlow - ${title}`);
      
      // Refresh profile in case it was updated in setup
      this.profile = this.expenseService.getProfile();
    });
  }
}
