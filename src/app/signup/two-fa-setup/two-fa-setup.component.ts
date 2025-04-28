import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_BASE_URL } from '../../constants';

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
    console.log("📨 Requesting QR with email:", this.email);
    this.http.get<any>(`${API_BASE_URL}/api/2fa/generate?email=${this.email}`).subscribe({
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
    this.http.post<any>(`${API_BASE_URL}/api/2fa/verify`, {
      secret: this.secret,
      code: this.totpCode
    }).subscribe({
      next: (res) => {
        if (res.valid) {
          console.log("📤 Sending email and secret to backend:", this.email, this.secret);
          this.http.post(`${API_BASE_URL}/api/users/set-totp-secret`, {
            email: this.email,
            secret: this.secret
          }, {responseType: 'text' })
          .subscribe({
            next: (res) => {
              console.log('Secret saved, response: ' + res);
              alert('2FAsetup complete. You may now log in.');
              this.router.navigate(['/login']);
            },
            error: () => {
              this.errorMessage = 'Could not save 2FA secret. Try again.';
            }
          });
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
