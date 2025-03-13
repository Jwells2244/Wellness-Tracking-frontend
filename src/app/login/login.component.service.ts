import { Component } from '@angular/core';
import { AuthService } from './auth.service';  // Make sure to import AuthService

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent {
username: string = '';
password: string = '';

constructor(private authService: AuthService) { }

  // Login method that calls AuthService
  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // If login is successful, store the token
        this.authService.storeToken(response.token);
        console.log('Login successful!');
        // Optionally, redirect to the home page or dashboard
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
