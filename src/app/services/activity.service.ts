import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants';
import { MealEntry, MentalEntry, PhysicalEntry } from '../activity.model';

@Injectable({
  providedIn: 'root'
})
export class WellnessService {
  private baseUrl = `${API_BASE_URL}/api/user`;

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

   // Delete entries
   deletePhysicalEntry(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/physical-wellbeing/logs/${id}`);
  }

  deleteMentalEntry(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/mental-wellbeing/logs/${id}`);
  }

  deleteMealEntry(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/meals/logs/${id}`);
  }
}