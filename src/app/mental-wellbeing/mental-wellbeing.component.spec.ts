import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MentalWellbeingComponent } from './mental-wellbeing.component';
import { MentalWellbeingService } from '../mental-wellbeing.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('MentalWellbeingComponent', () => {
  let component: MentalWellbeingComponent;
  let fixture: ComponentFixture<MentalWellbeingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [MentalWellbeingComponent],
      providers: [MentalWellbeingService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentalWellbeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log a mental wellbeing entry', () => {
    component.entry = { moodRating: 5, notes: 'Feeling good!' };
    spyOn(component['wellbeingService'], 'logEntry').and.callThrough();
    component.logEntry();
    expect(component['wellbeingService'].logEntry).toHaveBeenCalled();
  });
});
