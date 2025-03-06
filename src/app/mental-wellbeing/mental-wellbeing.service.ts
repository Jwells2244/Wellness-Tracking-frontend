import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MentalWellbeingService {
  private baseUrl = '/api/mental-wellbeing';

  constructor(private http: HttpClient) {}

  logEntry(entry: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/log`, entry);
  }

  getUserEntries(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/logs/${userId}`);
  }
}
