import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhysicalWellbeingService {
  private baseUrl = '/api/physical-wellbeing';

  constructor(private http: HttpClient) {}

  logEntry(entry: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/physicalactivity`, entry);
  }

  getActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/physicalactivities`);
  }
}
