import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthInterceptor } from '../auth.intercepter';
import { FormsModule } from '@angular/forms';
import { AppBarComponent } from '../app-bar/app-bar.component';

@Component({
  selector: 'app-entries-form',
  templateUrl: './entries-form.component.html',
  styleUrls: ['./entries-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AppBarComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // 👉 ADD THIS
  ]
})
export class EntriesFormComponent {
  constructor(private http: HttpClient) {}

  userId = 1; 
  physicalEntry = { 
    date: '', steps: null, distance: null, caloriesBurned: null, weight: null, 
    workoutType: '', otherWorkoutType: '' 
  };
  mentalEntry = { 
    date: '', moodRating: null, notes: '', bedTime: '', wakeupTime: '', 
    screenTime: null, stressLevel: null 
  };
  mealEntry = { date: '', mealType: '', description: '', calories: null, water: null };

  logPhysicalEntry() {
    if (this.physicalEntry.workoutType === 'Other') {
      this.physicalEntry.workoutType = this.physicalEntry.otherWorkoutType;
    }
  
    const payload = {
      date: this.physicalEntry.date,
      steps: this.physicalEntry.steps,
      distance: this.physicalEntry.distance,
      caloriesBurned: this.physicalEntry.caloriesBurned,
      weight: this.physicalEntry.weight,
      workoutType: this.physicalEntry.workoutType
    };
  
    this.http.post('http://localhost:8080/api/user/physical-wellbeing/log', payload)
      .subscribe({
        next: (res) => console.log('Physical entry saved', res),
        error: (err) => console.error('Error saving physical entry', err)
      });
  
    this.physicalEntry = {
      date: '', steps: null, distance: null,
      caloriesBurned: null, weight: null,
      workoutType: '', otherWorkoutType: ''
    };
  }
  

  logMentalEntry() {
    const bed = parseInt(this.mentalEntry.bedTime.replace(':', ''));
    const wake = parseInt(this.mentalEntry.wakeupTime.replace(':', ''));
  
    const payload = {
      date: this.mentalEntry.date,
      moodRating: this.mentalEntry.moodRating,
      stressLevel: this.mentalEntry.stressLevel,
      bedTime: bed,
      wakeupTime: wake,
      screenTime: this.mentalEntry.screenTime,
      notes: this.mentalEntry.notes
    };
  
    this.http.post('http://localhost:8080/api/user/mental-wellbeing/log', payload)
      .subscribe({
        next: (res) => console.log('Mental entry saved', res),
        error: (err) => console.error('Error saving mental entry', err)
      });
  
    this.mentalEntry = { date: '', moodRating: null, notes: '', bedTime: '', wakeupTime: '', screenTime: null, stressLevel: null };
  }
  

  logMealEntry() {
    const payload = {
      date: this.mealEntry.date,
      mealType: this.mealEntry.mealType,
      description: this.mealEntry.description,
      calories: this.mealEntry.calories,
      water: this.mealEntry.water
    };
  
    this.http.post('http://localhost:8080/api/user/meals/upload', payload)
      .subscribe({
        next: (res) => console.log('Meal entry saved', res),
        error: (err) => console.error('Error saving meal entry', err)
      });
  
    this.mealEntry = { date: '', mealType: '', description: '', calories: null, water: null };
  }
  

  checkWorkoutType() {
    if (this.physicalEntry.workoutType !== 'Other') {
      this.physicalEntry.otherWorkoutType = '';
    }
  }
}
