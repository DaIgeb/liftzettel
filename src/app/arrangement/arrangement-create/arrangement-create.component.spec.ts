import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangementCreateComponent } from './arrangement-create.component';

describe('ArrangementCreateComponent', () => {
  let component: ArrangementCreateComponent;
  let fixture: ComponentFixture<ArrangementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrangementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
