import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SideNavComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isSubmitting = false; 

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the profile form
  private initializeForm(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      occupation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.profileForm.invalid || this.isSubmitting) {
      this.handleInvalidForm();
      return;
    }

    this.isSubmitting = true; 
    this.dataService.addProfile(this.profileForm.value).subscribe({
      next: () => this.handleSuccess(),
      error: (error) => this.handleError(error),
      complete: () => (this.isSubmitting = false) 
    });
  }

  // Handle successful submission
  private handleSuccess(): void {
    this.openSnackBar('Profile added successfully!', 'Close');
    this.profileForm.reset(); 
  }

  // Handle errors during submission
  private handleError(error: any): void {
    console.error('Error saving profile:', error);
    this.openSnackBar('Failed to add profile. Please try again!', 'Close');
  }

  // Handle invalid form submission
  private handleInvalidForm(): void {
    if (this.profileForm.invalid) {
      this.openSnackBar('Please fill in all fields correctly!', 'Close');
    }
  }

  // Open a snackbar to display messages
  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
