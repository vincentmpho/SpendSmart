import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  incomeForm: any;
  selectedMonth: string;
  incomes: Array<{ month: string; source: string; amount: number; investments: string }> = [];
  monthSelected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      investments: ['', Validators.required]
    });

    this.getIncomesForMonth(this.selectedMonth);
  }

  onChange(event: any): void {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getIncomesForMonth(this.selectedMonth);
  }

  getIncomesForMonth(month: string): void {
    this.dataService.getIncomes(month).subscribe(
      (data) => {
        this.incomes = data || [];
      },
      (error) => {
        console.error('Error fetching income data:', error);
      }
    );
  }

  calculateTotalIncome(): number {
    return this.incomes.reduce((total, income) => total + (income.amount || 0), 0);
  }

  getFilteredIncomes(): Array<{ month: string; source: string; amount: number; investments: string }> {
    return this.incomes.filter((income) => income.month === this.selectedMonth);
  }

  onSubmit(): void {
    if (this.incomeForm.valid) {
      const newIncome = { ...this.incomeForm.value, month: this.selectedMonth };
      this.dataService.addIncome(newIncome).subscribe(
        (response) => {
          console.log('Income Added Successfully:', response);
          this.incomes.push(response);
          this.incomeForm.reset();
          this.incomeForm.patchValue({ month: this.selectedMonth });
        },
        (error) => {
          console.error('Error Adding Income:', error);
        }
      );
    }
  }

  saveForm(): void {
    this.dataService.saveAllIncomes(this.incomes).subscribe(
      () => {
        console.log('All incomes saved successfully!');
      },
      (error) => {
        console.error('Error saving incomes:', error);
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/spend-smart/dashboard']);
  }
}
