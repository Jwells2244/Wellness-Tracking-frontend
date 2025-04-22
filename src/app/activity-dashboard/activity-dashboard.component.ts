import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MealEntry, MentalEntry, PhysicalEntry } from '../activity.model';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { API_BASE_URL } from '../constants';
import { WellnessService } from '../services/activity.service';

@Component({
  selector: 'app-activity-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AppBarComponent],
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

  isChatbotOpen: boolean = false;
  chatInput: string = '';
  chatMessages: { from: 'user' | 'bot', text: string }[] = [];

  constructor(
    private wellnessService: WellnessService,
    private http: HttpClient
  ) {}

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

  confirmDelete(type: 'physical' | 'mental' | 'meal', id: number) {
    const confirmed = confirm('Are you sure you want to delete this entry?');
    if (!confirmed) return;
  
    if (type === 'physical') {
      this.wellnessService.deletePhysicalEntry(id).subscribe(() => {
        this.physicalEntries = this.physicalEntries.filter(entry => entry.id !== id);
        this.filteredPhysicalEntries = this.filteredPhysicalEntries.filter(entry => entry.id !== id);
      });
    }
  
    if (type === 'mental') {
      this.wellnessService.deleteMentalEntry(id).subscribe(() => {
        this.mentalEntries = this.mentalEntries.filter(entry => entry.id !== id);
        this.filteredMentalEntries = this.filteredMentalEntries.filter(entry => entry.id !== id);
      });
    }
  
    if (type === 'meal') {
      this.wellnessService.deleteMealEntry(id).subscribe(() => {
        this.mealEntries = this.mealEntries.filter(entry => entry.id !== id);
        this.filteredMealEntries = this.filteredMealEntries.filter(entry => entry.id !== id);
      });
    }
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

  resetFilters() {
    this.searchTerm = '';
    this.selectedDate = '';
    this.filteredPhysicalEntries = [...this.physicalEntries];
    this.filteredMentalEntries = [...this.mentalEntries];
    this.filteredMealEntries = [...this.mealEntries];
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }
  @ViewChild('messageContainer') messageContainer!: ElementRef;

ngAfterViewInit() {
  this.scrollToBottom();
}

formatTime(numericTime: number | string): string {
  const timeString = numericTime.toString().padStart(4, '0'); // '835' -> '0835'
  const hours = timeString.slice(0, 2);
  const minutes = timeString.slice(2, 4);
  return `${hours}:${minutes}`;
}


private scrollToBottom(): void {
  try {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  } catch (err) {
    console.warn('Scroll error:', err);
  }
}

  toggleChatbot() {
    this.isChatbotOpen = !this.isChatbotOpen;
  }
  loadingResponse = false;

  sendMessage() {
    if (!this.chatInput.trim()) return;
  
    const userMsg = this.chatInput.trim();
  
    this.chatMessages.push({ from: 'user', text: userMsg });
    this.chatInput = '';
    this.loadingResponse = true;
    setTimeout(() => this.scrollToBottom(), 0);
    const requestData = { messages: [{ role: 'user', content: userMsg }] };
  
    this.http.post<any>(`${API_BASE_URL}/api/groq-response`, requestData).subscribe({
      next: (response) => {
        this.loadingResponse = false;
        if (response && response.reply) {
          this.chatMessages.push({ from: 'bot', text: response.reply });
        } else {
          this.chatMessages.push({ from: 'bot', text: "Sorry, I couldn't process your request. Please try again later." });
        }
        setTimeout(() => this.scrollToBottom(), 0);
      },
      error: (error) => {
        this.loadingResponse = false;
        this.chatMessages.push({ from: 'bot', text: "Sorry, I couldn't process your request due to an error." });
        setTimeout(() => this.scrollToBottom(), 0);
      }
    });
  }  
}
