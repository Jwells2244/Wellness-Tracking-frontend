import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhysicalWellbeingComponent } from './physical-wellbeing.component';
import { PhysicalWellbeingService } from '../physical-wellbeing.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('PhysicalWellbeingComponent', () => {
  let component: PhysicalWellbeingComponent;
  let fixture: ComponentFixture<PhysicalWellbeingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [PhysicalWellbeingComponent],
      providers: [PhysicalWellbeingService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalWellbeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log a physical activity entry', () => {
    component.entry = { steps: 5000, distance: 3.5, caloriesBurned: 250 };
    spyOn(component['wellbeingService'], 'logEntry').and.callThrough();
    component.logEntry();
    expect(component['wellbeingService'].logEntry).toHaveBeenCalled();
  });
});
