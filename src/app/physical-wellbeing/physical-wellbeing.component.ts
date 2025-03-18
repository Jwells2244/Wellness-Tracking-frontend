import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-physical-wellbeing',
  templateUrl: './physical-wellbeing.component.html',
  styleUrls: ['./physical-wellbeing.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class PhysicalWellbeingComponent {
  entry = { date: new Date().toISOString().split('T')[0], steps: 0, distance: 0, caloriesBurned: 0 };
  entries: any[] = [];

  logEntry() {
    this.entries.push({ ...this.entry }); // Store a copy of the entry object
    this.entry = { date: new Date().toISOString().split('T')[0], steps: 0, distance: 0, caloriesBurned: 0 }; // Reset form
  }
}
