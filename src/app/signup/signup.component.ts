import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // ✅
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule, MatSnackBarModule] // ✅
})
export class SignupComponent {
  username: string = '';
  emailId: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // ✅
  ) {}

  private showSnackBar(message: string, duration: number = 3000): void {
    this.snackBar.open(message, '', { duration });
  }  

  onSubmit() {
    if (!this.username || !this.emailId || !this.password || !this.confirmPassword || !this.firstName || !this.lastName) {
      this.showSnackBar("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailId)) {
      this.showSnackBar("Please enter a valid email address.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showSnackBar("Passwords do not match!");
      return;
    }

    if (this.password.length < 6 || !/\d/.test(this.password)) {
      this.showSnackBar("Password must be at least 6 characters long and contain at least one digit.");
      return;
    }
    const lowerUsername = this.username.trim().toLowerCase();
  const lowerFirstName = this.firstName.trim().toLowerCase();
  const lowerLastName = this.lastName.trim().toLowerCase();

  if (
    lowerUsername === lowerFirstName ||
    lowerUsername === lowerLastName ||
    lowerFirstName === lowerLastName
  ) {
    this.showSnackBar("Username, First Name, and Last Name must all be different.");
    return;
  }

    const user = {
      username: this.username,
      emailId: this.emailId,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    };

    this.authService.signup(user).subscribe({
      next: () => {
        this.showSnackBar("Signup successful!");
        this.router.navigate(['/2fa-choice']);
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.showSnackBar("Signup failed. Please try again.");
      }
    });
  }
}
