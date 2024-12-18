import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data.service'; 

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'] 
})
export class IncomeComponent { 

  incomeForm: any;
  selectedMonth: string;
  incomes: any[] = []; 
  monthSelected: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataService) {
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

    // Fetch initial data for the selected month
    this.getIncomesForMonth(this.selectedMonth);
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getIncomesForMonth(this.selectedMonth);
  }

  getIncomesForMonth(month: string) {
    this.dataService.getIncomes(month).subscribe( 
      (data) => {
        this.incomes = data || []; // Ensure incomes is an array
      },
      (error) => {
        console.error('Error fetching income data:', error);
      }
    );
  }

  calculateTotalIncome(): number {
    return this.incomes.reduce((total, income) => total + (income.amount || 0), 0); 
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      this.dataService.addIncome(newIncome).subscribe (
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
  

  saveForm() {
    this.dataService.saveAllIncomes(this.incomes).subscribe( 
      () => {
        console.log('All incomes saved successfully!');
      },
      (error) => {
        console.error('Error saving incomes:', error);
      }
    );
  }
}
