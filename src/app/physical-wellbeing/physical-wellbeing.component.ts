import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhysicalWellbeingService } from './physical-wellbeing.service';

@Component({
  selector: 'app-physical-wellbeing',
  templateUrl: './physical-wellbeing.component.html',
  styleUrls: ['./physical-wellbeing.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PhysicalWellbeingComponent {
  // Define the entry object with default values.
  entry = {
    username: '',
    date: new Date().toISOString().split('T')[0],
    steps: null,
    distance: null,
    caloriesBurned: null,
    weight: null,
    workoutType: ''
  };

  // Local array to hold entries for display purposes.
  entries: any[] = [];

  constructor(private physicalWellbeingService: PhysicalWellbeingService) {}

  // Called when the form is submitted.
  logEntry(): void {
    // Build the payload from the current entry.
    const payload = { ...this.entry };

    // Call the service to upload the workout results.
    this.physicalWellbeingService.logEntry(payload).subscribe({
      next: (response) => {
        console.log('Physical entry saved', response);
        // Add the saved entry to the local array.
        this.entries.push(response);
        this.resetEntry();
      },
      error: (err) => {
        console.error('Error saving physical entry', err);
      }
    });
  }

  // Resets the entry to its default values.
  resetEntry(): void {
    this.entry = {
      username: '',
      date: new Date().toISOString().split('T')[0],
      steps: null,
      distance: null,
      caloriesBurned: null,
      weight: null,
      workoutType: ''
    };
  }
}