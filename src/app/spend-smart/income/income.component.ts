import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
  incomeForm: any;
  selectedMonth: string;
  incomes: Array<{
    month: string;
    source: string;
    amount: number;
    investments: string;
  }> = [];
  monthSelected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    const currentDate = new Date();
    this.selectedMonth = '';
  }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      investments: ['', Validators.required],
    });
  }

  onChange(event: any): void {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getIncomesForMonth(this.selectedMonth);
  }

  getIncomesForMonth(month: string): void {
    if (month) {
      this.dataService.getIncomes(month).subscribe(
        (data) => {
          this.incomes = data || [];
        },
        (error) => {
          console.error('Error fetching income data:', error);
        }
      );
    }
  }

  calculateTotalIncome(): number {
    return this.incomes.reduce(
      (total, income) => total + (income.amount || 0),
      0
    );
  }

  getFilteredIncomes(): Array<{
    month: string;
    source: string;
    amount: number;
    investments: string;
  }> {
    return this.incomes.filter((income) => income.month === this.selectedMonth);
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      // Add to local income list
      this.incomes.push(newIncome);
      this.incomeForm.reset();
    } else {
      alert('Please fill all required fields before adding income.');
    }
  }

  saveForm(): void {
    this.dataService.saveAllIncomes(this.incomes).subscribe(
      () => {
        // Notify user
        alert('Income saved successfully!');
        this.router.navigate(['/spend-smart/dashboard']);
      },
      (error) => {
        console.error('Error saving incomes:', error);
        alert('An error occurred while saving incomes.');
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/spend-smart/dashboard']);
  }
}
