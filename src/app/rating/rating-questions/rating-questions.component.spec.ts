import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingQuestionsComponent } from './rating-questions.component';

describe('RatingQuestionsComponent', () => {
  let component: RatingQuestionsComponent;
  let fixture: ComponentFixture<RatingQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
