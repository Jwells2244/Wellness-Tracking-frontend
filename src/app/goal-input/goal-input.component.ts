import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-goal-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goal-input.component.html',
  styleUrls: ['./goal-input.component.css']
})
export class GoalInputComponent {
  dailyGoal: number = 500;
  @Output() goalChanged = new EventEmitter<number>();

  updateGoal() {
    this.goalChanged.emit(this.dailyGoal);
  }
}