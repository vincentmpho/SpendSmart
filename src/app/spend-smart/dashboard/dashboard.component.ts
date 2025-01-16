import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // Income
  lastMonthsIncome = ['January: R1000', 'February: R1500', 'March: R1200'];
  currentMonthIncome = 2000;

  // Expense
  lastMonthsExpense = ['January: R800', 'February: R1000', 'March: R1200'];
  currentMonthExpense = 1500;

  // Todo Transactions with amount property added
  todoTransactions = [
    { description: 'Pay electricity bill', amount: 200 },
    { description: 'Self-care', amount: 100 },
    { description: 'Buy groceries', amount: 300 },
    { description: 'Gym', amount: 100 },
  ];

  // Total
  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 1500;

  constructor(public router: Router) {}

  // Navigation Methods
  onIncome() {
    this.router.navigate(['/spend-smart/income']);
  }
  onExpense() {
    this.router.navigate(['/spend-smart/expense']);
  }
  onTodo() {
    this.router.navigate(['/spend-smart/todo']);
  }

  // Calculate Current Month Savings
  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }

  // Calculate Total Transactions
  get totalTransactions(): number {
    return this.todoTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  }
}
