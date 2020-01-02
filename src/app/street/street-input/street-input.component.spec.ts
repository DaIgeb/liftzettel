import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetInputComponent } from './street-input.component';

describe('StreetInputComponent', () => {
  let component: StreetInputComponent;
  let fixture: ComponentFixture<StreetInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreetInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
