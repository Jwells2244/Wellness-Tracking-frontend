import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust path if needed
import { VisualizerComponent } from '../visualizer/visualizer.component'; // Adjust path

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [VisualizerComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isAuthenticated = false;
  userName: string = 'User'; // Default fallback

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.name;
    }
  }

  toggleTheme() {
    // your theme logic here
  }

  logout() {
    this.authService.logout();
  }
}
