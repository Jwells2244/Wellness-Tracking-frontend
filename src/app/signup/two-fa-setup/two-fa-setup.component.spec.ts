import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TwoFaSetupComponent } from './two-fa-setup.component';

describe('TwoFaSetupComponent', () => {
  let component: TwoFaSetupComponent;
  let fixture: ComponentFixture<TwoFaSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoFaSetupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TwoFaSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

