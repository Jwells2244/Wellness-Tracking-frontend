// meal-entry.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealEntryComponent } from './meal-entry.component';
import { MealEntryService } from './meal-entry.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('MealEntryComponent', () => {
  let component: MealEntryComponent;
  let fixture: ComponentFixture<MealEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [MealEntryComponent],
      providers: [MealEntryService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload a meal', () => {
    component.meal = { name: 'Test Meal', calories: 500, description: 'Test Description' };
    spyOn(component['mealService'], 'uploadMeal').and.callThrough();
    component.uploadMeal();
    expect(component['mealService'].uploadMeal).toHaveBeenCalled();
  });
});