import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly baseUrl = 'https://localhost:7286/api';
  private readonly endpoints = {
    income: `${this.baseUrl}/income`,
    expenses: `${this.baseUrl}/expenses`,
    profile: `${this.baseUrl}/profile`,
    transaction: `${this.baseUrl}/transaction/add`,
  };

  constructor(private http: HttpClient) {}

  // ----------------- Income Methods -----------------
  getIncomes(month: string): Observable<any> {
    return this.http.get(`${this.endpoints.income}/${month}`);
  }

  addIncome(income: any): Observable<any> {
    return this.http.post(this.endpoints.income, income);
  }

  saveAllIncomes(incomes: any[]): Observable<any> {
    return this.http.post(`${this.endpoints.income}/bulk`, incomes);
  }

  // ----------------- Expense Methods -----------------
  getExpenses(month: string): Observable<any> {
    return this.http.get(`${this.endpoints.expenses}/${month}`);
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post(this.endpoints.expenses, expense);
  }

  saveAllExpenses(expenses: any[]): Observable<any> {
    const normalizedExpenses = expenses.map((expense) => ({
      ...expense,
      id: 0, // Ensure the Id is set to 0
    }));
    return this.http.post(`${this.endpoints.expenses}/bulk`, normalizedExpenses);
  }

  // ----------------- Profile Methods -----------------
  addProfile(profile: any): Observable<any> {
    return this.http.post(this.endpoints.profile, profile);
  }

  // ----------------- Transaction Methods -----------------
  addTransaction(transaction: any): Observable<any> {
    return this.http.post(this.endpoints.transaction, transaction);
  }
}
