import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-fa-setup',
  standalone: true,
  templateUrl: './two-fa-setup.component.html',
  styleUrls: ['./two-fa-setup.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TwoFaSetupComponent {
  email: string = '';
  secret: string = '';
  qrCodeUrl: string = '';
  totpCode: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  generate2FA() {
    this.http.get<any>(`/api/2fa/generate?email=${this.email}`).subscribe({
      next: (res) => {
        this.secret = res.secret;
        this.qrCodeUrl = res.qrCodeUrl;
      },
      error: () => {
        this.errorMessage = 'Failed to generate QR code. Please try again.';
      }
    });
  }

  verifyCode() {
    this.http.post<any>('/api/2fa/verify', {
      secret: this.secret,
      code: this.totpCode
    }).subscribe({
      next: (res) => {
        if (res.valid) {
          alert('2FA setup complete. You may now log in.');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Invalid authenticator code. Try again.';
        }
      },
      error: () => {
        this.errorMessage = 'Verification failed. Try again.';
      }
    });
  }
}
