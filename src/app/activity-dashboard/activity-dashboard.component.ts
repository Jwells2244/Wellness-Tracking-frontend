import { Component, OnInit } from '@angular/core';
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

  toggleChatbot() {
    this.isChatbotOpen = !this.isChatbotOpen;
  }

  sendMessage() {
    if (!this.chatInput.trim()) return;
  
    const userMsg = this.chatInput.trim();
    console.log('User message:', userMsg);
  
    this.chatMessages.push({ from: 'user', text: userMsg });
  
    this.http.post<any>('http://localhost:8080/api/chatbot', { message: userMsg }).subscribe({
      next: (response) => {
        console.log('Response from bot:', response);
        this.chatMessages.push({ from: 'bot', text: response.reply });
      },
      error: (error) => {
        console.error('Error while communicating with chatbot:', error);
        this.chatMessages.push({ from: 'bot', text: "Sorry, I couldn't process your request." });
      }
    });
  
    this.chatInput = '';
  }  
}
