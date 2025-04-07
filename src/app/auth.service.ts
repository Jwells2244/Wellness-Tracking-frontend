import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // ✅ Centralized API URL

  constructor(private http: HttpClient) {}

  // ✅ Signup (User Registration)
  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // ✅ Login (User Authentication)
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // ✅ Store JWT Token After Login
  storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  // ✅ Get Token for Authentication
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // ✅ Check If User Is Logged In
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ✅ Logout User
  logout() {
    localStorage.removeItem('authToken');
  }
}
