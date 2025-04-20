import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WellnessService } from '../activity.service';
import { MealEntry, MentalEntry, PhysicalEntry } from '../activity.model';
import { AppBarComponent } from '../app-bar/app-bar.component';

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

  // Chatbot-related properties
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
  
    this.http.post<any>('http://localhost:8080/api/groq-response', requestData).subscribe({
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
