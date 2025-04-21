import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Adjust path if needed
import { VisualizerComponent } from '../visualizer/visualizer.component'; // Adjust path if needed
import { ThemeService } from '../theme.service'; // Adjust path if needed

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
  latestEntry: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService // ✅ Add this line
  ) {}
  
  

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.username; // dynamically displays in template
    }
  }
  
  toggleTheme(): void {
    console.log('🌗 Toggling theme');
    this.themeService.toggleTheme(); // ✅ call the service method
  }
  
  

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']); // Make sure this route exists in app.routes.ts
  }
}
