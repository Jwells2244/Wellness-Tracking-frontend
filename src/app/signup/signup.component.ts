import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
selector: 'app-signup',
templateUrl: './signup.component.html',
styleUrls: ['./signup.component.css'],
imports: [FormsModule, RouterModule, CommonModule, HttpClientModule],
providers: [HttpClient]  // Provide HttpClient here for the standalone component
})
export class SignupComponent {
username: string = '';
email: string = '';
password: string = '';
confirmPassword: string = '';
selectedCategory: string = '';
message: string = '';

constructor(private authService: AuthService, private router: Router) {
    console.log("SignupComponent Loaded");
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match!';
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      category: this.selectedCategory
    };

    // Call the signup method from AuthService
    this.authService.signup(user).subscribe(
      (response: any) => {
        this.message = 'User registered successfully!';
        this.router.navigate(['/login']);  // Redirect to login page after successful signup
      },
      (error: any) => {
        console.error('Signup error:', error);
        this.message = 'Error signing up. Please try again.';
      }
    );
  }
}
