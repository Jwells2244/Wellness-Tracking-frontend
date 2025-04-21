import { Component, OnInit } from '@angular/core';
import { MealEntryService } from './meal-entry.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-entry',
  templateUrl: './meal-entry.component.html',
  styleUrls: ['./meal-entry.component.css'],
  imports: [ FormsModule]
})
export class MealEntryComponent implements OnInit {
  selectedTab: string = 'client'; 
  email: string = '';
  password: string = '';
  adminId: string = '';
  clientId: string = '';
  trainerId: string = '';
  meal = { name: '', calories: 0, description: '' };
  meals: any[] = [];
  userId = 1;

  constructor(private mealService: MealEntryService) {}

  ngOnInit() {
    this.getMeals();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  onSubmit() {
    console.log('Submitted login for:', this.selectedTab);
    console.log('Email:', this.email, 'Password:', this.password);
    // Optionally: validate login or redirect based on role
  }

  uploadMeal() {
    this.mealService.uploadMeal(this.meal).subscribe(response => {
      this.meals.push(response);
      this.meal = { name: '', calories: 0, description: '' };
    });
  }

  getMeals() {
    this.mealService.getMealsForUser(this.userId).subscribe(response => {
      this.meals = response;
      console.log('Fetched meals:', this.meals);
    });
  }
}
