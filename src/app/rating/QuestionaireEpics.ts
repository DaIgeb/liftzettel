import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-es6-compat';
import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { AppState } from '../store/model';
import { IQuestionaire, IQuestionaireError } from './model';
import { QuestionaireAPIAction, QuestionaireAPIActions } from './questionaire.actions';
import { QuestionaireService } from './questionaire.service';

const questionairesNorAlreadyFetched = (
  state: AppState,
): boolean =>
  (
    state.ratings &&
    !state.ratings.questionaires.fetched &&
    !state.ratings.questionaires.loading
  );

@Injectable({
  providedIn: 'root'
})
export class QuestionaireEpics {
  constructor(private service: QuestionaireService, private actions: QuestionaireAPIActions) { }
  createEpic() {
    return this.createLoadEpic();
  }

  private createLoadEpic(): Epic<QuestionaireAPIAction<IQuestionaire[] | IQuestionaireError>, QuestionaireAPIAction<IQuestionaire[] | IQuestionaireError>, AppState> {
    return (action$, state$) => action$.pipe(
      filter((a) => a.type === QuestionaireAPIActions.LOAD),
      filter((a, $) => questionairesNorAlreadyFetched(state$.value)),
      switchMap((a) => this.service.getAll().pipe(
        map(data => this.actions.loadSucceeded(data)),
        catchError(res =>
          of(this.actions.loadFailed({
            status: '' + res.status,
          }))),
        startWith(this.actions.loadStarted()))));
  }
}
