import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Import RouterLink

@Component({
  selector: 'app-login',
  imports: [RouterLink], // Include RouterLink in imports array
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  isCoach: boolean = true;  // Default is 'Coach'

  toggleLoginMode() {
    this.isCoach = !this.isCoach; // Toggle between 'Coach' and 'Trainer'
  }
}
