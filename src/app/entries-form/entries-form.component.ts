import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthInterceptor } from '../auth.intercepter';
import { FormsModule } from '@angular/forms';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { API_BASE_URL } from '../constants';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
  selectedForm = 'physical';

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

  private showSnackbar(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isError ? 'snack-error' : 'snack-success',
    });
  }

  logPhysicalEntry() {
    const f = this.physicalEntry;
    if (!f.date || f.steps == null || f.distance == null || f.caloriesBurned == null || f.weight == null || !f.workoutType || (f.workoutType === 'Other' && !f.otherWorkoutType)) {
      this.showSnackbar('Please fill in all Physical form fields.', true);
      return;
    }
  
    const workoutType = f.workoutType === 'Other' ? f.otherWorkoutType : f.workoutType;
  
    const payload = {
      date: f.date,
      steps: f.steps,
      distance: f.distance,
      caloriesBurned: f.caloriesBurned,
      weight: f.weight,
      workoutType: workoutType
    };
  
    this.http.post(`${API_BASE_URL}/api/user/physical-wellbeing/log`, payload).subscribe({
      next: () => {
        this.showSnackbar('Physical entry saved!');
        this.physicalEntry = {
          date: '', steps: null, distance: null,
          caloriesBurned: null, weight: null,
          workoutType: '', otherWorkoutType: ''
        };
      },
      error: () => this.showSnackbar('Error saving physical entry.', true),
    });
  }
  

  logMentalEntry() {
    const f = this.mentalEntry;
    if (!f.date || f.moodRating == null || f.stressLevel == null || !f.bedTime || !f.wakeupTime || f.screenTime == null || !f.notes) {
      this.showSnackbar('Please fill in all Mental form fields.', true);
      return;
    }

    const payload = {
      ...f,
      bedTime: parseInt(f.bedTime.replace(':', '')),
      wakeupTime: parseInt(f.wakeupTime.replace(':', '')),
    };

    this.http.post(`${API_BASE_URL}/api/user/mental-wellbeing/log`, payload).subscribe({
      next: () => {
        this.showSnackbar('Mental entry saved!');
        this.mentalEntry = { date: '', moodRating: null, notes: '', bedTime: '', wakeupTime: '', screenTime: null, stressLevel: null };
      },
      error: () => this.showSnackbar('Error saving mental entry.', true),
    });
  }

  logMealEntry() {
    const f = this.mealEntry;
    if (!f.date || !f.mealType || !f.description || f.calories == null || f.water == null) {
      this.showSnackbar('Please fill in all Meal form fields.', true);
      return;
    }

    this.http.post(`${API_BASE_URL}/api/user/meals/upload`, f).subscribe({
      next: () => {
        this.showSnackbar('Meal entry saved!');
        this.mealEntry = { date: '', mealType: '', description: '', calories: null, water: null };
      },
      error: () => this.showSnackbar('Error saving meal entry.', true),
    });
  }

  checkWorkoutType() {
    if (this.physicalEntry.workoutType !== 'Other') {
      this.physicalEntry.otherWorkoutType = '';
    }
  }
}