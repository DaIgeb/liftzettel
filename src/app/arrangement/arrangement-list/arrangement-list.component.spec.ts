import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangementListComponent } from './arrangement-list.component';

describe('ArrangementListComponent', () => {
  let component: ArrangementListComponent;
  let fixture: ComponentFixture<ArrangementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrangementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
