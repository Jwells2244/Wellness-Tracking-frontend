import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../safe.pipe';

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
    { name: 'Mental', types: ['Meditation', 'Mindfulness'] },
    { name: 'Diet Meal', types: ['Vegan Meals', 'Keto Meals'] }
  ];

  selectedCategory: string = 'All';
  selectedType: string = '';
  selectedGender: string = '';
  selectedExperience: string = '';

  selectedTypes: string[] = [];
  ngOnInit(): void {
    this.workouts = [
      {
        instructor: { name: 'Sunny', gender: 'Male', expertise: 2 },
        type: 'Cardio',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed/9psH-BsJ_IM'
      },
      {
        instructor: { name: 'Roberta', gender: 'Female', expertise: 4 },
        type: 'Cardio',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//cZyHgKtK75A'
      },
      {
        instructor: { name: 'Rick', gender: 'Male', expertise: 5 },
        type: 'Cardio',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed/melA7IB117I'
      },
      {
        instructor: { name: 'Caroline', gender: 'Female', expertise: 8 },
        type: 'Cardio',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//kZDvg92tTMc'
      },
      {
        instructor: { name: 'Marie Steffen ', gender: 'Female', expertise: 3 },
        type: 'Flexibility',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//i6TzP2COtow'
      },
      {
        instructor: { name: 'Toni Mitchell ', gender: 'Female', expertise: 5 },
        type: 'Flexibility',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//-SD_MucCa6c'
      },
      {
        instructor: { name: 'Tony Roy ', gender: 'Male', expertise: 11 },
        type: 'Flexibility',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//FI51zRzgIe4'
      },
      {
        instructor: { name: 'Daniela', gender: 'Female', expertise: 1 },
        type: 'Flexibility',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//YfCK3uOz1r4'
      },
      {
        instructor: { name: 'Carolina', gender: 'Female', expertise: 4 },
        type: 'Strength Training',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//GViX8riaHX4'
      },
      {
        instructor: { name: 'Tone', gender: 'Male', expertise: 6 },
        type: 'Strength Training',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//7GkMHPe_OXw'
      },
      {
        instructor: { name: 'Barbell', gender: 'Male', expertise: 3 },
        type: 'Strength Training',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//34LJX-arUo8'
      },
      {
        instructor: { name: 'Ben', gender: 'Male', expertise: 6 },
        type: 'Running',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//3RN7-oOTIEw'
      },
      {
        instructor: { name: 'Manni', gender: 'Male', expertise: 12 },
        type: 'Running',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//yN8tKZobL8c'
      },
      {
        instructor: { name: 'Marie', gender: 'Female', expertise: 2 },
        type: 'Running',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//vv54e5YR6uA'
      },
      {
        instructor: { name: 'Nancy', gender: 'Female', expertise: 5 },
        type: 'Yoga',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//Eml2xnoLpYE'
      },
      {
        instructor: { name: 'Kassandra', gender: 'Female', expertise: 7 },
        type: 'Yoga',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//CM43AZaRXNw'
      },
      {
        instructor: { name: 'Nicole', gender: 'Female', expertise: 14 },
        type: 'Yoga',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//uqJ-jANozcE'
      },
      {
        instructor: { name: 'Phillip', gender: 'Male', expertise: 1 },
        type: 'Yoga',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//16u9UJekrG0'
      },
      {
        instructor: { name: 'Sean', gender: 'Male', expertise: 4 },
        type: 'Pilates',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//dHmoD-ArFYo'
      },
      {
        instructor: { name: 'John', gender: 'Male', expertise: 8 },
        type: 'Pilates',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//0MsirNd1AnY'
      },
      {
        instructor: { name: 'Nicole', gender: 'Female', expertise: 9 },
        type: 'Pilates',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//y2RcYo36boM'
      },
      {
        instructor: { name: 'Trinity', gender: 'Female', expertise: 5 },
        type: 'HIIT',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//cbKkB3POqaY'
      },
      {
        instructor: { name: 'Sarah', gender: 'Female', expertise: 2 },
        type: 'HIIT',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//jeLxN-wt7jY'
      },
      {
        instructor: { name: 'Ashley', gender: 'Female', expertise: 10 },
        type: 'HIIT',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//jqUGUYpxQ7U'
      },
      {
        instructor: { name: 'Jackson', gender: 'Male', expertise: 3 },
        type: 'HIIT',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//npofZutKsfA'
      },
      {
        instructor: { name: 'James', gender: 'Male', expertise: 4 },
        type: 'HIIT',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//uTo2m16eJqI'
      },
      {
        instructor: { name: 'Tim Crain', gender: 'Male', expertise: 6 },
        type: 'Cycling',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//wBurKQX7h4Q'
      },
      {
        instructor: { name: 'Kaleigh', gender: 'Female', expertise: 1 },
        type: 'Cycling',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//8PJMYSB1kxQ'
      },
      {
        instructor: { name: 'Kevin', gender: 'Male', expertise: 4 },
        type: 'Cycling',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//0L9BYzo98FA'
      },
      {
        instructor: { name: 'Mariana', gender: 'Female', expertise: 9},
        type: 'Cycling',
        category: 'Physical',
        videoUrl: 'https://www.youtube.com/embed//ewrf_rCHUdA'
      },
      {
        instructor: { name: 'James', gender: 'Male', expertise: 4 },
        type: 'Meditation',
        category: 'Mental',
        videoUrl: 'https://www.youtube.com/embed/6p_yaNFSYao'
      },
      {
        instructor: { name: 'Emily', gender: 'Female', expertise: 3 },
        type: 'Mindfulness',
        category: 'Mental',
        videoUrl: 'https://www.youtube.com/embed/w6T02g5hnT4'
      },
      {
        instructor: { name: 'Chef Anna', gender: 'Female', expertise: 5 },
        type: 'Vegan Meals',
        category: 'Diet Meal',
        videoUrl: 'https://www.youtube.com/embed/nfHNbNXVg1k'
      },
      {
        instructor: { name: 'Chef Ron', gender: 'Male', expertise: 6 },
        type: 'Keto Meals',
        category: 'Diet Meal',
        videoUrl: 'https://www.youtube.com/embed/0eV1kzWGWbE'
      },
    ];

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