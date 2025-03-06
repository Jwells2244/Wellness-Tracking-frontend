import { Component, OnInit } from '@angular/core';
import { PhysicalWellbeingService } from '../physical-wellbeing.service';

@Component({
  selector: 'app-physical-wellbeing',
  templateUrl: './physical-wellbeing.component.html',
  styleUrls: ['./physical-wellbeing.component.css']
})
export class PhysicalWellbeingComponent implements OnInit {
  entry = { steps: 0, distance: 0, caloriesBurned: 0 };
  entries: any[] = [];

  constructor(private wellbeingService: PhysicalWellbeingService) {}

  ngOnInit() {
    this.getEntries();
  }

  logEntry() {
    this.wellbeingService.logEntry(this.entry).subscribe(response => {
      this.entries.push(response);
      this.entry = { steps: 0, distance: 0, caloriesBurned: 0 }; // Reset form
    });
  }

  getEntries() {
    this.wellbeingService.getActivities().subscribe(response => {
      this.entries = response;
    });
  }
}
