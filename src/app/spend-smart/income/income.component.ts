import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';



@Component({

  selector: 'app-income',

  standalone: true,

  imports: [ReactiveFormsModule, CommonModule],

  templateUrl: './income.component.html',

  styleUrl: './income.component.scss'

})

export class IncomeComponent {

  incomeForm: any;

  selectedMonth: any;

  januaryIncomes: any[] = [
    { source: 'Tech Startup Side Hustle', amount: 3000, investments: 'Crypto' },
    { source: 'Social Media Content Creation', amount: 1500, investments: 'NFTs' },
  ];
  
  februaryIncomes: any[] = [
    { source: 'Full-Time Job', amount: 4000, investments: 'Index Funds' },
    { source: 'Thrift Flip Sales', amount: 800, investments: 'Luxury Sneakers' },
  ];
  
  marchIncomes: any[] = [
    { source: 'App Development Freelance', amount: 2500, investments: 'Tech ETFs' },
    { source: 'eSports Streaming', amount: 1000, investments: 'Gaming Gear' },
    { source: 'Weekend Food Pop-Up', amount: 600, investments: 'Community Events' },
  ];
  

  monthSelected:boolean=false;

  constructor(public fb: FormBuilder,public router:Router) {

    const currentDate = new Date();

    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });

  }

  ngOnInit(): void {

    this.incomeForm = this.fb.group({

      month: ['', Validators.required],

      source: ['', Validators.required],

      amount: ['', Validators.required],

      investments: ['', Validators.required]

    });

  }



  onChange(event: any) {

    this.selectedMonth = event.target.value

    this.monthSelected=true;

    this.getFilteredIncomes();

  }



  calculateTotalIncome(month: string): number {

    let totalIncome = 0;

    for (const income of this.getIncomesForMonth(month)) {

      totalIncome += income.amount;

    }

    return totalIncome;

  }



  getIncomesForMonth(month: string): any[] {

    switch (month) {

      case 'January':

        return this.januaryIncomes;

      case 'February':

        return this.februaryIncomes;

      case 'March':

        return this.marchIncomes;

      default:

        return [];

    }

  }



  getFilteredIncomes() {

    let filteredIncomes: any[] = [];

    switch (this.selectedMonth) {

      case 'January':

        filteredIncomes = [...this.januaryIncomes];

        break;

      case 'February':

        filteredIncomes = [...this.februaryIncomes];

        break;

      case 'March':

        filteredIncomes = [...this.marchIncomes];

        break;

      default:

        break;

    }

    return filteredIncomes;

  }

  onSubmit() {

    if (this.incomeForm.valid) {

      const newIncome = this.incomeForm.value;

      switch (this.selectedMonth) {

        case 'January':

          this.januaryIncomes.push(newIncome);

          break;

        case 'February':

          this.februaryIncomes.push(newIncome);

          break;

        case 'March':

          this.marchIncomes.push(newIncome);

          break;

        default:

          break;

      }

      this.incomeForm.reset();

      this.incomeForm.patchValue({ month: '', source: '', amount: '', investments: '' });

    }

  }



  saveForm() {

    console.log("Form saved!");

  }



  onBack() {

    this.router.navigate(['/spend-smart/dashboard']);

  }

}

