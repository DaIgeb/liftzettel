import { TestBed } from '@angular/core/testing';

import { EnclosureService } from './enclosure.service';

describe('EnclosureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnclosureService = TestBed.get(EnclosureService);
    expect(service).toBeTruthy();
  });
});
