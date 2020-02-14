import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../store/model';
import { IQuestionaire, IQuestionaireError, IRatingState } from './model';
import * as fromActions from './questionaire.actions';
import { QuestionaireService } from './questionaire.service';

const questionairesNorAlreadyFetched = (
  state: IRatingState,
): boolean =>
  (
    state && state.questionaires && (
      !state.questionaires.fetched ||
      !state.questionaires.loading ||
      state.questionaires.items.length === 0
    )
  );

@Injectable()
export class QuestionaireEpics {
  constructor(
    private service: QuestionaireService,
    private store: Store<AppState>,
    private actions$: Actions,
  ) { }

  loadQuestionnaire$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.loadQuestionnaires),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(s => s.ratings)))
    )),
    filter(([_, state]) => questionairesNorAlreadyFetched(state)),
    switchMap(([, _]) =>
      this.service.getAll().pipe(
        map(data => fromActions.loadQuestionnairesSucceeded({ payload: data })),
        catchError(res => of(
          fromActions.loadQuestionnairesFailed({
            payload: {
              status: '' + res.status,
            },
            error: true
          }),
        )))
    )));
}
