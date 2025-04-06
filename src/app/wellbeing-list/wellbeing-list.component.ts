import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../safe.pipe';
import videosData from './wellbeing-list-data';

interface Instructor {
  name: string;
  gender: string;
  expertise: number;
}

interface Workout {
  instructor: Instructor;
  type: string;
  category: string;
  videoUrl: string;
}

@Component({
  selector: 'app-wellbeing-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SafePipe],
  templateUrl: './wellbeing-list.component.html',
  styleUrls: ['./wellbeing-list.component.css']
})
export class WellbeingListComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];

  categories = [
    { name: 'Physical', types: ['Cardio', 'Strength Training', 'Yoga', 'Cycling', 'HIIT', 'Pilates', 'Running', 'Flexibility'] },
    { name: 'Mental', types: ['Meditation', 'Mindfulness', 'Motivation', 'Tips'] },
    { name: 'Diet Meal', types: ['Vegan Meals', 'Keto Meals', 'Paleo Meals','Low Carb Meals', 'High Protein Meals'] }
  ];

  selectedCategory: string = 'All';
  selectedType: string = '';
  selectedGender: string = '';
  selectedExperience: string = '';

  selectedTypes: string[] = [];
  ngOnInit(): void {
    this.workouts = videosData;

    this.filteredWorkouts = this.workouts;
  }

  onCategoryChange(): void {
    console.log('Selected Category:', this.selectedCategory);
  
    if (this.selectedCategory === 'All') {
      console.log('All Categories selected');
      this.selectedTypes = [];
      this.categories.forEach(category => {
        console.log('Adding types from category:', category.name);
        this.selectedTypes.push(...category.types);
      });
      this.selectedType = '';
      console.log('All types after selection of All Categories:', this.selectedTypes);
    } else {
      console.log('Specific category selected:', this.selectedCategory);
      const category = this.categories.find(cat => cat.name === this.selectedCategory);
      if (category) {
        console.log('Category found:', category.name);
        this.selectedTypes = category.types; 
        console.log('Updated types for selected category:', this.selectedTypes);
        this.selectedType = ''; 
      } else {
        console.log('Category not found!');
      }
    }
    this.filterWorkouts();
    console.log('Filtered workouts based on selected category and type.');
  }
  
    

  filterWorkouts(): void {
    this.filteredWorkouts = this.workouts.filter(workout => {
      const matchCategory = this.selectedCategory === 'All' || workout.category === this.selectedCategory;
      const matchGender = !this.selectedGender || workout.instructor.gender === this.selectedGender;
      const matchType = this.selectedCategory === 'All' || !this.selectedType || workout.type === this.selectedType;
      const matchExperience = !this.selectedExperience || this.expertiseInRange(workout.instructor.expertise, this.selectedExperience);
      return matchCategory && matchGender && matchType && matchExperience;
    });
  }
  

  private expertiseInRange(expertise: number, range: string): boolean {
    switch (range) {
      case '0-1': return expertise >= 0 && expertise <= 1;
      case '1-3': return expertise > 1 && expertise <= 3;
      case '3-6': return expertise > 3 && expertise <= 6;
      case '6-10': return expertise > 6 && expertise <= 10;
      case '10+': return expertise > 10;
      default: return true;
    }
  }
}