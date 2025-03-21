import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entries-form',
  templateUrl: './entries-form.component.html',
  styleUrls: ['./entries-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EntriesFormComponent {
  physicalEntry = { 
    date: '', 
    steps: null, 
    distance: null, 
    caloriesBurned: null, 
    weight: null, 
    workoutType: '', 
    otherWorkoutType: '' 
  };
  physicalEntries: any[] = [];

  mentalEntry = { date: '', moodRating: null, notes: '', bedTime: '', wakeupTime: '', screenTime: null, stressLevel: null };
  mentalEntries: any[] = [];

  mealEntry = { date: '', mealType: '', description: '', calories: null, water: null };
  mealEntries: any[] = [];

  logPhysicalEntry() {
    if (this.physicalEntry.workoutType === 'Other') {
      this.physicalEntry.workoutType = this.physicalEntry.otherWorkoutType; // ✅ Save custom workout type
    }
    this.physicalEntries.push({ ...this.physicalEntry });

    this.physicalEntry = { 
      date: '', 
      steps: null, 
      distance: null, 
      caloriesBurned: null, 
      weight: null, 
      workoutType: '', 
      otherWorkoutType: '' 
    };
  }

  logMentalEntry() {
    this.mentalEntries.push({ ...this.mentalEntry });
    this.mentalEntry = { date: '', moodRating: null, notes: '', bedTime: '', wakeupTime: '', screenTime: null, stressLevel: null };
  }

  logMealEntry() {
    this.mealEntries.push({ ...this.mealEntry });
    this.mealEntry = { date: '', mealType: '', description: '', calories: null, water: null};
  }

  checkWorkoutType() {
    // If the user selects 'Other', clear the input field for custom workout type
    if (this.physicalEntry.workoutType !== 'Other') {
      this.physicalEntry.otherWorkoutType = '';
    }
  }
}
