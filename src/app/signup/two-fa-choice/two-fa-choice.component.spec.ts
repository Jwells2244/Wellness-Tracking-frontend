import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorChoiceComponent } from './two-fa-choice.component';

describe('TwoFAChoiceComponent', () => {
  let component: TwoFactorChoiceComponent;
  let fixture: ComponentFixture<TwoFactorChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoFactorChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFactorChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
