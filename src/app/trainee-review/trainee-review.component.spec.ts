import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeReviewComponent } from './trainee-review.component';

describe('TraineeReviewComponent', () => {
  let component: TraineeReviewComponent;
  let fixture: ComponentFixture<TraineeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
