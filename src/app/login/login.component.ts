import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class LoginComponent {
  username: string = '';  
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    console.log('🔵 Sending login request with:', this.username, this.password);
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('🟢 Login response:', response);
  
        if (response?.requires2FA) {
          sessionStorage.setItem('2fa_username', this.username);
          this.router.navigate(['/2fa-login']);
        } else if (response?.token) {
          this.authService.storeToken(response.token); // ✅ Only this is needed
  
          this.snackBar.open('✅ Login Successful!', 'Close', {
            duration: 3000,
            panelClass: ['snack-success']
          });
          this.router.navigate(['/activity-dashboard']);
        } else {
          this.snackBar.open('❌ Invalid credentials.', 'Close', {
            duration: 3000,
            panelClass: ['snack-error']
          });
        }
      },
      (error: any) => {
        console.error('🔴 Login error:', error);
        this.snackBar.open('❌ Login Failed! Invalid credentials.', 'Close', {
          duration: 3000,
          panelClass: ['snack-error']
        });
      }
    );
  }
  
}
