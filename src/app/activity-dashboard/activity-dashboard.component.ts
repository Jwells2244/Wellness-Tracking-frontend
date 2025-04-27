import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MealEntry, MentalEntry, PhysicalEntry } from '../activity.model';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { API_BASE_URL } from '../constants';
import { WellnessService } from '../services/activity.service';
import { Router } from '@angular/router';

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

  newPhysicalEntry: Partial<PhysicalEntry> = {};

  loadingResponse = false;

  constructor(
    private wellnessService: WellnessService,
    private http: HttpClient,
    private router: Router
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

  // ✅ Save Physical Entry Correctly
  savePhysicalEntry() {
    const payload = {
      date: this.newPhysicalEntry.date,
      steps: this.newPhysicalEntry.steps,
      distance: this.newPhysicalEntry.distance,
      caloriesBurned: this.newPhysicalEntry.caloriesBurned,
      weight: this.newPhysicalEntry.weight,
      workoutType: this.newPhysicalEntry.workoutType
    };

    this.http.post(`${API_BASE_URL}/api/user/physical-wellbeing/log`, payload).subscribe({
      next: (response) => {
        console.log('✅ Physical entry saved:', response);
        this.router.navigate(['/profile']);  // Redirect to Profile
      },
      error: (error) => {
        console.error('❌ Error saving physical entry:', error);
      }
    });
  }

  confirmDelete(type: 'physical' | 'mental' | 'meal', id: number) {
    const confirmed = confirm('Are you sure you want to delete this entry?');
    if (!confirmed) return;

    if (type === 'physical') {
      this.wellnessService.deletePhysicalEntry(id).subscribe(() => {
        this.physicalEntries = this.physicalEntries.filter(entry => entry.id !== id);
        this.filteredPhysicalEntries = [...this.physicalEntries];
      });
    }
    // Add similar for mental and meal if needed
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase();
    const date = this.selectedDate;

    this.filteredPhysicalEntries = this.physicalEntries.filter(entry => {
      const entryDate = this.formatDate(entry.date);
      return (!date || entryDate === date) &&
             (!term || entry.workoutType.toLowerCase().includes(term));
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedDate = '';
    this.filteredPhysicalEntries = [...this.physicalEntries];
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
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
          this.chatMessages.push({ from: 'bot', text: "Sorry, I couldn't process your request." });
        }
        setTimeout(() => this.scrollToBottom(), 0);
      },
      error: () => {
        this.loadingResponse = false;
        this.chatMessages.push({ from: 'bot', text: "Sorry, error occurred." });
        setTimeout(() => this.scrollToBottom(), 0);
      }
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
  formatTime(numericTime: number | string): string {
    const timeString = numericTime.toString().padStart(4, '0');
    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2, 4);
    return `${hours}:${minutes}`;
  }
  
}
