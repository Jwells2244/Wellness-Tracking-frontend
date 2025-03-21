import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
providedIn: 'root'
})
export class SignupService {
private baseUrl = 'http://localhost:8080'; 
  http: any;

constructor(private authService: AuthService) {}

  signup(userData: { username: string, email: string, password: string, confirmPassword: string, category: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // Specify content type
      })
    }).pipe(
      catchError((error) => {
        console.error('Signup error:', error);  // Log error for debugging
        return of(null);  // Return a fallback observable so the app can continue
      })
    );
  }
}
