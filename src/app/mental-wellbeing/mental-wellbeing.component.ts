import { Component, OnInit } from '@angular/core';
import { MentalWellbeingService } from '../mental-wellbeing.service';

@Component({
  selector: 'app-mental-wellbeing',
  templateUrl: './mental-wellbeing.component.html',
  styleUrls: ['./mental-wellbeing.component.css']
})
export class MentalWellbeingComponent implements OnInit {
  entry = { moodRating: 0, notes: '' };
  entries: any[] = [];
  userId = 1; // Replace with dynamic user ID retrieval

  constructor(private wellbeingService: MentalWellbeingService) {}

  ngOnInit() {
    this.getEntries();
  }

  logEntry() {
    this.wellbeingService.logEntry(this.entry).subscribe(response => {
      this.entries.push(response);
      this.entry = { moodRating: 0, notes: '' }; // Reset form
    });
  }

  getEntries() {
    this.wellbeingService.getUserEntries(this.userId).subscribe(response => {
      this.entries = response;
    });
  }
}
