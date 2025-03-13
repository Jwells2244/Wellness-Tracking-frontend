import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class AuthService {
private apiUrlSignup = 'http://localhost:8080/api/auth/register';
private apiUrlLogin = 'http://localhost:8080/api/auth/login';

constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post(this.apiUrlSignup, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(this.apiUrlLogin, loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
