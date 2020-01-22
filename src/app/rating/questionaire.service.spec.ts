import { TestBed } from '@angular/core/testing';

import { QuestionaireService } from './questionaire.service';

describe('QuestionaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionaireService = TestBed.get(QuestionaireService);
    expect(service).toBeTruthy();
  });
});
