import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://localhost:7286/api/expenses';

  constructor(private http: HttpClient) {}

  // Get expenses by month
  getExpenses(month: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${month}`);
  }

  // Add a new expense
  addExpense(expense: any): Observable<any> {
    return this.http.post(this.baseUrl, expense);
  }

  // Save all expenses
  saveAllExpenses(expenses: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/bulk`, expenses);
  }


  //Add Profile
  addProfile(profile: any): Observable<any> {
    return this.http.post('https://localhost:7286/api/profile', profile);
  }
  
}