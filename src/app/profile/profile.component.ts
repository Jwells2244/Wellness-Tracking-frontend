import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisualizerComponent } from '../visualizer/visualizer.component'; // Adjust path if needed
import { ThemeService } from '../services/theme.service'; // Adjust path if needed
import { AuthService } from '../services/auth.service';

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
  
  
  profileImage: string | ArrayBuffer | null = null; // Holds uploaded image

onPhotoSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result;
      localStorage.setItem('profileImage', this.profileImage as string); // ✅ Save image to localStorage
    };
    reader.readAsDataURL(file);
  }
}

// inside ngOnInit()
ngOnInit(): void {
  this.isAuthenticated = this.authService.isAuthenticated();
  if (!this.isAuthenticated) {
    this.router.navigate(['/login']);
    return;
  }

  const user = this.authService.getUser();
  console.log('Loaded user from localStorage:', user);

  if (user && user.username) {
    this.userName = user.username;
    console.log('✅ Username set to:', this.userName);
  } else {
    console.warn('⚠️ No username found');
  }

  // ✅ Load saved profile image from localStorage if exists
  const savedProfileImage = localStorage.getItem('profileImage');
  if (savedProfileImage) {
    this.profileImage = savedProfileImage;
    console.log('✅ Loaded profile image from localStorage');
  } else {
    console.log('⚠️ No saved profile image found');
  }
}


  
  toggleTheme(): void {
    console.log('🌗 Toggling theme');
    this.themeService.toggleTheme(); // ✅ call the service method
  }
  
  

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('user');
 // ✅ Clear profile image on logout
    this.router.navigate(['/login']);
  }
  
}
