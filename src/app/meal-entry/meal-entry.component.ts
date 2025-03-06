import { Component, OnInit } from '@angular/core';
import { MealEntryService } from 'meal-entry.service';

@Component({
  selector: 'app-meal-entry',
  templateUrl: './meal-entry.component.html',
  styleUrls: ['./meal-entry.component.css']
})
export class MealEntryComponent implements OnInit {
  meal = { name: '', calories: 0, description: '' };
  meals: any[] = [];
  userId = 1; // Replace with dynamic user ID retrieval

  constructor(private mealService: MealEntryService) {}

  ngOnInit() {
    this.getMeals();
  }

  uploadMeal() {
    this.mealService.uploadMeal(this.meal).subscribe(response => {
      this.meals.push(response);
      this.meal = { name: '', calories: 0, description: '' }; // Reset form
    });
  }

  getMeals() {
    this.mealService.getMealsForUser(this.userId).subscribe(response => {
      this.meals = response;
    });
  }
}
