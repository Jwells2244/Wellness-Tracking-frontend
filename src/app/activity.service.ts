import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealEntry, MentalEntry, PhysicalEntry } from './activity.model';

@Injectable({
  providedIn: 'root'
})
export class WellnessService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  getMentalEntries(): Observable<MentalEntry[]> {
    return this.http.get<MentalEntry[]>(`${this.baseUrl}/mental-wellbeing/logs`);
  }

  getPhysicalEntries(): Observable<PhysicalEntry[]> {
    return this.http.get<PhysicalEntry[]>(`${this.baseUrl}/physical-wellbeing/logs`);
  }

  getMealEntries(): Observable<MealEntry[]> {
    return this.http.get<MealEntry[]>(`${this.baseUrl}/meals/logs`);
  }
}