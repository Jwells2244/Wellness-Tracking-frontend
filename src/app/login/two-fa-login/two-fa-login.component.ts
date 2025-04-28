import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { API_BASE_URL } from '../../constants';

@Component({
  selector: 'app-two-fa-login',
  standalone: true,
  templateUrl: './two-fa-login.component.html',
  styleUrls: ['./two-fa-login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TwoFaLoginComponent {
  totpCode: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const username = sessionStorage.getItem('2fa_username');

    if (!username) {
      this.errorMessage = 'Login session expired. Please login again.';
      return;
    }

    this.http.post<any>(`${API_BASE_URL}/api/2fa/verify-login`, {
      username,
      code: this.totpCode
    }).subscribe({
      next: (res) => {
        if (res.token) {
          // Store token and user
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          // Cleanup session state
          sessionStorage.removeItem('2fa_username');

          // Route into protected area
          this.router.navigate(['/entries-form']);
        } else {
          this.errorMessage = 'Unexpected response. Please try again.';
        }
      },
      error: () => {
        this.errorMessage = 'Invalid code. Please try again.';
      }
    });
  }
}
