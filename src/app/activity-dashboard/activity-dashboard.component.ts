import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WellnessService } from '../activity.service';
import { MealEntry, MentalEntry, PhysicalEntry } from '../activity.model';
import { AppBarComponent } from '../app-bar/app-bar.component';

@Component({
  selector: 'app-activity-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AppBarComponent],
  templateUrl: './activity-dashboard.component.html',
  styleUrls: ['./activity-dashboard.component.css']
})
export class ActivityDashboardComponent implements OnInit {
  mentalEntries: MentalEntry[] = [];
  physicalEntries: PhysicalEntry[] = [];
  mealEntries: MealEntry[] = [];

  filteredMentalEntries: MentalEntry[] = [];
  filteredPhysicalEntries: PhysicalEntry[] = [];
  filteredMealEntries: MealEntry[] = [];

  searchTerm: string = '';
  selectedDate: string = '';

  constructor(private wellnessService: WellnessService) {}

  ngOnInit() {
    this.loadWellnessData();
  }

  loadWellnessData() {
    this.wellnessService.getMentalEntries().subscribe(entries => {
      this.mentalEntries = entries;
      this.filteredMentalEntries = [...entries];
    });

    this.wellnessService.getPhysicalEntries().subscribe(entries => {
      this.physicalEntries = entries;
      this.filteredPhysicalEntries = [...entries];
    });

    this.wellnessService.getMealEntries().subscribe(entries => {
      this.mealEntries = entries;
      this.filteredMealEntries = [...entries];
    });
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase();
    const date = this.selectedDate;
  
    this.filteredPhysicalEntries = this.physicalEntries.filter(entry => {
      const entryDate = this.formatDate(entry.date);
      return (!date || entryDate === date) &&
             (!term || entry.workoutType.toLowerCase().includes(term));
    });
  
    this.filteredMentalEntries = this.mentalEntries.filter(entry => {
      const entryDate = this.formatDate(entry.date);
      return (!date || entryDate === date) &&
             (!term || (entry.notes && entry.notes.toLowerCase().includes(term)));
    });
  
    this.filteredMealEntries = this.mealEntries.filter(entry => {
      const entryDate = this.formatDate(entry.date);
      return (!date || entryDate === date) &&
             (!term || entry.description.toLowerCase().includes(term));
    });
  }  

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0]; // YYYY-MM-DD in UTC
  }   

  resetFilters() {
    this.searchTerm = '';
    this.selectedDate = '';
    this.filteredPhysicalEntries = [...this.physicalEntries];
    this.filteredMentalEntries = [...this.mentalEntries];
    this.filteredMealEntries = [...this.mealEntries];
  }

  isChatbotOpen: boolean = false;
chatInput: string = '';
chatMessages: { from: 'user' | 'bot', text: string }[] = [];

toggleChatbot() {
  this.isChatbotOpen = !this.isChatbotOpen;
}

sendMessage() {
  if (!this.chatInput.trim()) return;

  const userMsg = this.chatInput.trim();
  this.chatMessages.push({ from: 'user', text: userMsg });

  // Bot logic (you can enhance this with NLP/AI later)
  const botReply = this.generateBotReply(userMsg);
  this.chatMessages.push({ from: 'bot', text: botReply });

  this.chatInput = '';
}

generateBotReply(userInput: string): string {
  const lowerInput = userInput.toLowerCase();

  if (lowerInput.includes('meal')) return 'You can try a high-protein salad or smoothie today!';
  if (lowerInput.includes('workout')) return 'How about a 30-minute HIIT session?';
  if (lowerInput.includes('stress')) return 'Try deep breathing or a 5-minute meditation.';
  if (lowerInput.includes('water')) return 'Remember to drink 8 glasses of water today!';

  return "I'm here to help! Ask me about meals, workouts, or your wellbeing.";
}

}
