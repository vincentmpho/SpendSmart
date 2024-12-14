import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule], 
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
 

export class ExpenseComponent  {
  expenseForm!: any;
  selectedMonth: string;
  expenses: any[] = [];
  monthSelected: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required],
    });
  }

  getFilteredExpenses(): any[] {
    
    return this.expenses.filter(expense => expense.month === this.selectedMonth);
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
        const newExpense = this.expenseForm.value;
        this.expenseForm.disable(); // Disable form
        this.dataService.addExpense(newExpense).subscribe({
            next: () => {
                alert('Expense saved successfully!');
                this.loadExpenses(this.selectedMonth);
                this.expenseForm.reset();
                this.expenseForm.enable(); // Enable form
            },
            error: (err) => {
                console.error('Error saving expense:', err);
                this.expenseForm.enable(); // Enable form on error
            },
        });
    }
}


  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.loadExpenses(this.selectedMonth);
  }

  loadExpenses(month: string) {
    this.dataService.getExpenses(month).subscribe({
      next: (data) => {
        this.expenses = data;
      },
      error: (err) => {
        console.error('Error fetching expenses:', err);
      },
    });
  }

  saveForm() {
    this.dataService.saveAllExpenses(this.expenses).subscribe({
      next: () => {
        alert('All expenses saved successfully!');
      },
      error: (err) => {
        console.error('Error saving all expenses:', err);
      },
    });
  }
  

  calculateTotalExpense(month: string): number {
    return this.expenses.reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onBack() {
    this.router.navigate(['/spend-smart/dashboard']);
  }
}
