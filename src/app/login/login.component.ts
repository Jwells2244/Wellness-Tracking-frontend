import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css'],
imports: [FormsModule, RouterModule, CommonModule]
})
export class LoginComponent {
email: string = '';
password: string = '';

constructor(private router: Router) {}
// userId: string = ''; // Unified User ID input
// selectedTab: 'admin' | 'client' | 'trainer' = 'client'; // Default to client login

// ✅ Define properties to track role
// isAdmin: boolean = false;
// isClient: boolean = true;
// isTrainer: boolean = false;

// selectTab(tab: 'admin' | 'client' | 'trainer') {
//     this.selectedTab = tab;

//     // ✅ Update role flags dynamically
//     this.isAdmin = tab === 'admin';
//     this.isClient = tab === 'client';
//     this.isTrainer = tab === 'trainer';
//   }

  onSubmit() {
    console.log("Login Submitted", {
      email: this.email,
      password: this.password,
      // userId: this.userId,
      // role: this.selectedTab,
      // isAdmin: this.isAdmin,
      // isClient: this.isClient,
      // isTrainer: this.isTrainer
    });
    alert('✅ Login Successful!');
    this.router.navigate(['/entries-form']);
  }
}


