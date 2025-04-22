import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isAuthenticated();
    console.log('AuthGuard - isLoggedIn:', this.authService.isAuthenticated());

    if (isLoggedIn) {
      console.log('Navigating to wellbeing-list (Videos)...');
      return true; 
    } else {
      console.log('User is not logged in. Redirecting to login...');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; 
    }
  }
}
