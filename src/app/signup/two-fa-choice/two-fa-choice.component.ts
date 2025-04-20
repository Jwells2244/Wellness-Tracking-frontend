import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-fa-choice',
  templateUrl: './two-fa-choice.component.html',
})
export class TwoFactorChoiceComponent {
  constructor(private router: Router) {}

  goTo2FASetup() {
    this.router.navigate(['/2fa-setup']);
  }

  skipToLogin() {
    this.router.navigate(['/login']);
  }
}
