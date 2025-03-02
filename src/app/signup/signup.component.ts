import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Import RouterLink

@Component({
  selector: 'app-signup',
  imports: [RouterLink], // Include RouterLink in imports array
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
})
export class SignupComponent {}
