// Login Component
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterModule, CommonModule]
})
export class LoginComponent {
  username: string = '';  // ✅ Match form input
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}  // ✅ Inject AuthService

  onSubmit() {
    console.log('🔵 Sending login request with:', this.username, this.password);
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('🟢 Login response:', response);
        if (response && response.token) {
          this.authService.storeToken(response.token);
          alert('✅ Login Successful!');
          this.router.navigate(['/entries-form']);
        } else {
          alert('❌ Invalid credentials.');
        }
      },
      (error: any) => {
        console.error('🔴 Login error:', error);
        alert('❌ Login Failed! Invalid credentials.');
      }
    );
  }  
}
