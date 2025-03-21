import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,  
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule]  
})
export class SignupComponent {
  username: string = '';
  emailId: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      username: this.username,
      emailId: this.emailId,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName 
    };

    this.authService.signup(user).subscribe(
      response => {
        alert('✅ Signup successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('❌ Signup error:', error);
        alert('❌ Signup failed. Please try again.');
      }
    );
  }
}
