import { combineEpics } from 'redux-observable-es6-compat';

import { RatingEpics } from './RatingEpics';
import { QuestionaireEpics } from './QuestionaireEpics';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Epics {
  constructor(
    private ratingEpics: RatingEpics,
    private questionaireEpics: QuestionaireEpics,
  ) { }

  createEpic() {
    return combineEpics(
      this.ratingEpics.createEpic(),
      this.questionaireEpics.createEpic()
    );
  }

}

