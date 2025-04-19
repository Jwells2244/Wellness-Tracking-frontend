import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


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

    try {
      const decoded: any = jwtDecode(token);
      // Save just the username (sub field) as the "user"
      if (decoded && decoded.sub) {
        this.storeUser({ name: decoded.sub }); // ✅ this is your username
      }
    } catch (err) {
      console.error('❌ Failed to decode token', err);
    }
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
  // ✅ Store User Info After Login
storeUser(user: any) {
  

  localStorage.setItem('user', JSON.stringify(user));
}

// ✅ Get Stored User
getUser(): any {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}
}