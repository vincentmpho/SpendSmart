import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private incomeBaseUrl = 'https://localhost:7286/api/incomes';
  private expenseBaseUrl = 'https://localhost:7286/api/expenses';
  private profileBaseUrl = 'https://localhost:7286/api/profile';

  constructor(private http: HttpClient) {}

  // ----------------- Income Methods -----------------

  // Get incomes by month
  getIncomes(month: string): Observable<any> {
    return this.http.get(`${this.incomeBaseUrl}/${month}`);
  }

  // Add a new income
  addIncome(income: any): Observable<any> {
    return this.http.post(this.incomeBaseUrl, income);
  }

  // Save all incomes
  saveAllIncomes(incomes: any[]): Observable<any> {
    return this.http.post(`${this.incomeBaseUrl}/bulk`, incomes);
  }

  // ----------------- Expense Methods -----------------

  // Get expenses by month
  getExpenses(month: string): Observable<any> {
    return this.http.get(`${this.expenseBaseUrl}/${month}`);
  }

  // Add a new expense
  addExpense(expense: any): Observable<any> {
    return this.http.post(this.expenseBaseUrl, expense);
  }

  // Save all expenses
  saveAllExpenses(expenses: any[]): Observable<any> {
    return this.http.post(`${this.expenseBaseUrl}/bulk`, expenses);
  }

  // ----------------- Profile Methods -----------------

  // Add a new profile
  addProfile(profile: any): Observable<any> {
    return this.http.post(this.profileBaseUrl, profile);
  }
}
