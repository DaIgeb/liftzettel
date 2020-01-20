import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCreateComponent } from './rating-create.component';

describe('RatingCreateComponent', () => {
  let component: RatingCreateComponent;
  let fixture: ComponentFixture<RatingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
