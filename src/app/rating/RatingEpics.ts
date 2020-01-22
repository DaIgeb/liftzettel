import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-es6-compat';
import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { AppState } from '../store/model';
import { IRating, IRatingError } from './model';
import { RatingAPIAction, RatingAPIActions } from './actions';
import { RatingService } from './rating.service';

const ratingsNorAlreadyFetched = (
  country: string,
  state: AppState,
): boolean =>
  (
    state.ratings &&
    !state.ratings.ratings.fetched &&
    !state.ratings.ratings.loading
  );

@Injectable({
  providedIn: 'root'
})
export class RatingEpics {
  constructor(private service: RatingService, private actions: RatingAPIActions) { }
  createEpic() {
    return this.createLoadEpic();
  }
  private createLoadEpic(): Epic<RatingAPIAction<IRating[] | IRatingError>, RatingAPIAction<IRating[] | IRatingError>, AppState> {
    return (action$, state$) => action$.pipe(filter((a) => a.type === RatingAPIActions.LOAD), filter((a) => ratingsNorAlreadyFetched(a.meta.country, state$.value)), switchMap((a) => this.service.getAll(a.meta.country).pipe(map(data => this.actions.loadSucceeded(data, a.meta.country)), catchError(res => of(this.actions.loadFailed({
      status: '' + res.status,
    }, a.meta.country))), startWith(this.actions.loadStarted(a.meta.country)))));
  }
}
