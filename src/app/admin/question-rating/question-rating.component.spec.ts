import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRatingComponent } from './question-rating.component';

describe('QuestionRatingComponent', () => {
  let component: QuestionRatingComponent;
  let fixture: ComponentFixture<QuestionRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
