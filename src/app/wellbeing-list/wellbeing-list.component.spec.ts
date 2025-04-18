import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellbeingListComponent } from './wellbeing-list.component';

describe('WellbeingListComponent', () => {
  let component: WellbeingListComponent;
  let fixture: ComponentFixture<WellbeingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellbeingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellbeingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
