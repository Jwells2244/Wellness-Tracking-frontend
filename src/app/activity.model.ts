export interface MentalEntry {
    id: number;
    username: string;
    date: Date;
    moodRating: number;
    stressLevel: number;
    bedTime: number;
    wakeupTime: number;
    screenTime: number;
    notes: string;
  }
  
  export interface PhysicalEntry {
    id: number;
    username: string;
    date: Date;
    steps: number;
    distance: number;
    caloriesBurned: number;
    weight: number;
    workoutType: string;
  }
  
  export interface MealEntry {
    id: number;
    username: string;
    date: Date;
    mealType: string;
    description: string;
    calories: number;
    water: number;
  }