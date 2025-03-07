import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  signup(userData: { email: string; password: string; confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }
}
