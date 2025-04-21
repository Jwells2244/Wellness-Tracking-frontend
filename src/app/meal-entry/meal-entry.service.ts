import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class MealEntryService {
  private baseUrl = '/api/meals';

  constructor(private http: HttpClient) {}

  uploadMeal(meal: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, meal);
  }

  getMealsForUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }
}