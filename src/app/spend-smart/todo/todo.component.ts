import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-todo',

  standalone: true,

  imports: [ReactiveFormsModule, CommonModule, MatIconModule],

  templateUrl: './todo.component.html',

  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todoForm: any;

  selectedMonth: any;

  expenses: { month: string; expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 1500 },

    { month: 'February', expenseAmount: 2000 },

    { month: 'March', expenseAmount: 1800 },
  ];

  monthSelected: boolean = false;

  januaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1000 },

    { expenseType: 'Light Bills', expenseAmount: 500 },
  ];

  februaryExpense: any[] = [
    { expenseType: 'Essentials', expenseAmount: 200 },

    { expenseType: 'Light Bills', expenseAmount: 400 },
  ];

  marchExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1100 },

    { expenseType: 'Essentials', expenseAmount: 250 },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService // Inject the service
  ) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', {
      month: 'long',
    });
  
    this.selectedMonth = currentMonth;
  }
  

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],

      expenseType: ['', Validators.required],

      expenseAmount: ['', Validators.required],
    });
  }
  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
  
      // Use the DataService to save the transaction to the API
      this.dataService.addTransaction(newExpense).subscribe(
        (response) => {
          console.log('Transaction added successfully:', response);
  
          // Reset the form after successful submission
          this.todoForm.reset({
            month: '',
            expenseType: '',
            expenseAmount: '',
          });
  
          // Optionally update the UI to reflect the new data
          this.getFilteredExpenses();
        },
        (error) => {
          console.error('Error adding transaction:', error);
        }
      );
    }
  }
  

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
  
    // Fetch expenses from the API
    this.dataService.getExpenses(this.selectedMonth).subscribe(
      (expenses) => {
        console.log('Expenses fetched successfully:', expenses);
  
        // Update local expenses list for display
        switch (this.selectedMonth) {
          case 'January':
            this.januaryExpense = expenses;
            break;
          case 'February':
            this.februaryExpense = expenses;
            break;
          case 'March':
            this.marchExpense = expenses;
            break;
          default:
            break;
        }
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }
  

  getFilteredExpenses() {
    let filteredExpense: any[] = [];

    switch (this.selectedMonth) {
      case 'January':
        filteredExpense = [...this.januaryExpense];

        break;

      case 'February':
        filteredExpense = [...this.februaryExpense];

        break;

      case 'March':
        filteredExpense = [...this.marchExpense];

        break;

      default:
        break;
    }

    return filteredExpense;
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;

    for (const income of this.gettodoFormonth(month)) {
      totalExpense += income.expenseAmount;
    }

    return totalExpense;
  }

  gettodoFormonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryExpense;

      case 'February':
        return this.februaryExpense;

      case 'March':
        return this.marchExpense;

      default:
        return [];
    }
  }

  onSave() {
    if (this.todoForm.valid) {
      const incomeData = this.todoForm.value;

      this.todoForm.reset({ month: this.selectedMonth });

      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log('Form saved!');
  }

  onBack() {
    this.router.navigate(['/spend-smart/dashboard']);
  }

  toggleSelection(expense: any) {
    expense.selected = !expense.selected;
  }
}
