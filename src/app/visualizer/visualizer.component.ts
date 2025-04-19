import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { GoalInputComponent } from '../goal-input/goal-input.component';

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [CommonModule, NgChartsModule, GoalInputComponent],
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent {
  public calorieGoal: number = 500;
  public caloriesBurned = 375;
  public exerciseMinutes = 45;
  public standHours = 10;
  public isDailyView = true;

  toggleView() {
    this.isDailyView = !this.isDailyView;
  }

  updateCalorieGoal(newGoal: number) {
    this.calorieGoal = newGoal;
  }

  public chartType: 'doughnut' = 'doughnut';

  public chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  private getProgressColor(percent: number): string {
    if (percent >= 100) return '#4ade80'; // Green
    if (percent >= 60) return '#facc15';  // Yellow
    return '#f87171';                     // Red
  }

  get goalReached(): boolean {
    return this.caloriesBurned >= this.calorieGoal;
  }

  get caloriesData(): ChartConfiguration<'doughnut'>['data'] {
    const remaining = Math.max(this.calorieGoal - this.caloriesBurned, 0);
    const percent = (this.caloriesBurned / this.calorieGoal) * 100;
    return {
      labels: ['Calories Burned', 'Remaining'],
      datasets: [
        {
          data: [this.caloriesBurned, remaining],
          backgroundColor: [this.getProgressColor(percent), '#F0F0F0'],
          borderWidth: 0
        }
      ]
    };
  }

  get exerciseData(): ChartConfiguration<'doughnut'>['data'] {
    const goal = Math.max(this.calorieGoal / 10, 1);
    const remaining = Math.max(goal - this.exerciseMinutes, 0);
    const percent = (this.exerciseMinutes / goal) * 100;
    return {
      labels: ['Exercise Minutes', 'Remaining'],
      datasets: [
        {
          data: [this.exerciseMinutes, remaining],
          backgroundColor: [this.getProgressColor(percent), '#F0F0F0'],
          borderWidth: 0
        }
      ]
    };
  }

  get standData(): ChartConfiguration<'doughnut'>['data'] {
    const goal = Math.max(this.calorieGoal / 50, 1);
    const remaining = Math.max(goal - this.standHours, 0);
    const percent = (this.standHours / goal) * 100;
    return {
      labels: ['Stand Hours', 'Remaining'],
      datasets: [
        {
          data: [this.standHours, remaining],
          backgroundColor: [this.getProgressColor(percent), '#F0F0F0'],
          borderWidth: 0
        }
      ]
    };
  }

  public dailyCaloriesData = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [30, 60, 90, 50, 70, 40],
        backgroundColor: '#FF6B6B'
      }
    ]
  };

  public dailyCaloriesOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  public weeklyBarData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories',
        data: [420, 360, 390, 410, 400, 450, 380],
        backgroundColor: '#FF6B6B'
      },
      {
        label: 'Exercise',
        data: [30, 25, 40, 35, 20, 45, 50],
        backgroundColor: '#4BC0C0'
      },
      {
        label: 'Stand',
        data: [8, 9, 7, 6, 10, 11, 9],
        backgroundColor: '#36A2EB'
      }
    ]
  };

  public weeklyBarOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  public weeklyLineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Calories',
        data: [2500, 2800, 2600, 2900],
        borderColor: '#FF6B6B',
        fill: false,
        tension: 0.3
      },
      {
        label: 'Exercise (min)',
        data: [210, 240, 220, 250],
        borderColor: '#4BC0C0',
        fill: false,
        tension: 0.3
      },
      {
        label: 'Stand (hrs)',
        data: [70, 75, 72, 78],
        borderColor: '#36A2EB',
        fill: false,
        tension: 0.3
      }
    ]
  };

  public weeklyLineOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
}
