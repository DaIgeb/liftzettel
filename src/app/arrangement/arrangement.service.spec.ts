import { TestBed } from '@angular/core/testing';

import { ArrangementService } from './arrangement.service';

describe('ArrangementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrangementService = TestBed.get(ArrangementService);
    expect(service).toBeTruthy();
  });
});
