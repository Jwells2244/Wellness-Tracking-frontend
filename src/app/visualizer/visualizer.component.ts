import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { GoalInputComponent } from '../goal-input/goal-input.component';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../constants';

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [CommonModule, NgChartsModule, GoalInputComponent],
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {
  public calorieGoal = 500;
  public distanceGoal = 5;    // ✅ distance goal (km)
  public stepsGoal = 10000;   // ✅ steps goal

  public caloriesBurned = 0;
  public distance = 0;
  public stepsCount = 0;

  public isDailyView = true;
  public showToast = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPhysicalEntries();
  }

  loadPhysicalEntries() {
    this.http.get<any[]>(`${API_BASE_URL}/api/user/physical-wellbeing/logs`).subscribe({
      next: entries => {
        if (entries.length) {
          const latest = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
          this.caloriesBurned = latest.caloriesBurned || 0;
          this.distance = latest.distance || 0;
          this.stepsCount = latest.steps || 0;
          this.showToast = true;
          setTimeout(() => this.showToast = false, 2000);
        }
      },
      error: err => console.error('❌ Error fetching:', err)
    });
  }

  toggleView() {
    this.isDailyView = !this.isDailyView;
  }

  updateCalorieGoal(newGoal: number) {
    this.calorieGoal = newGoal;

    // 🔥 Update distance and steps goals dynamically too
    this.distanceGoal = Math.round(newGoal / 1000 * 5); // Example: 5000 kcal → 25 km
    this.stepsGoal = Math.round(newGoal * 2);            // Example: 5000 kcal → 10000 steps

    console.log(`Updated Goals → Calories: ${this.calorieGoal}, Distance: ${this.distanceGoal}km, Steps: ${this.stepsGoal}`);
  }

  public chartType: 'doughnut' = 'doughnut';

  public chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%',
    plugins: { legend: { display: false }, tooltip: { enabled: true } }
  };

  private getProgressColor(percent: number): string {
    return percent >= 100 ? '#4ade80' : percent >= 60 ? '#facc15' : '#f87171';
  }

  get caloriesData(): ChartData<'doughnut'> {
    const remaining = Math.max(this.calorieGoal - this.caloriesBurned, 0);
    return {
      datasets: [{
        data: [this.caloriesBurned, remaining],
        backgroundColor: [this.getProgressColor((this.caloriesBurned / this.calorieGoal) * 100), '#F0F0F0'],
        borderWidth: 0
      }]
    };
  }

  get distanceData(): ChartData<'doughnut'> {
    const remaining = Math.max(this.distanceGoal - this.distance, 0);
    return {
      datasets: [{
        data: [this.distance, remaining],
        backgroundColor: [this.getProgressColor((this.distance / this.distanceGoal) * 100), '#F0F0F0'],
        borderWidth: 0
      }]
    };
  }

  get stepsData(): ChartData<'doughnut'> {
    const remaining = Math.max(this.stepsGoal - this.stepsCount, 0);
    return {
      datasets: [{
        data: [this.stepsCount, remaining],
        backgroundColor: [this.getProgressColor((this.stepsCount / this.stepsGoal) * 100), '#F0F0F0'],
        borderWidth: 0
      }]
    };
  }

  public dailyCaloriesData: ChartData<'line'> = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    datasets: [{
      label: 'Calories Burned',
      data: [30, 60, 90, 50, 70, 40],
      borderColor: '#FF6B6B',
      fill: false,
      tension: 0.4
    }]
  };

  public dailyCaloriesOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: true }, tooltip: { enabled: true } },
    scales: { y: { beginAtZero: true } }
  };

  public weeklyBarData: ChartData<'bar'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Calories', data: [420, 360, 390, 410, 400, 450, 380], backgroundColor: '#FF6B6B' },
      { label: 'Distance (km)', data: [4, 5, 3.5, 6, 4.5, 5.5, 4], backgroundColor: '#4BC0C0' },
      { label: 'Steps', data: [8000, 9000, 7000, 6000, 10000, 11000, 9000], backgroundColor: '#36A2EB' }
    ]
  };

  public weeklyBarOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top' }, tooltip: { enabled: true } },
    scales: { y: { beginAtZero: true } }
  };

  public weeklyLineData: ChartData<'line'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { label: 'Calories', data: [2500, 2800, 2600, 2900], borderColor: '#FF6B6B', fill: false, tension: 0.3 },
      { label: 'Distance (km)', data: [25, 28, 26, 29], borderColor: '#4BC0C0', fill: false, tension: 0.3 },
      { label: 'Steps', data: [70000, 75000, 72000, 78000], borderColor: '#36A2EB', fill: false, tension: 0.3 }
    ]
  };

  get remainingCalories(): number {
    return Math.max(this.calorieGoal - this.caloriesBurned, 0);
  }
  
  get remainingDistance(): number {
    return Math.max(this.distanceGoal - this.distance, 0);
  }
  
  get remainingSteps(): number {
    return Math.max(this.stepsGoal - this.stepsCount, 0);
  }
  

  public weeklyLineOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: true }, tooltip: { enabled: true } },
    scales: { y: { beginAtZero: true } }
  };
}
