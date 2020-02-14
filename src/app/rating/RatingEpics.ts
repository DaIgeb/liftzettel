
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, filter, map, switchMap, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../store/model';
import { IRatingState } from './model';
import * as fromActions from './actions';
import { RatingService } from './rating.service';

const ratingsNorAlreadyFetched = (
  state: IRatingState,
): boolean =>
  (
    state && state.ratings && (
      !state.ratings.fetched ||
      !state.ratings.loading ||
      state.ratings.items.length === 0
    )
  );

@Injectable()
export class RatingEpics {
  constructor(
    private service: RatingService,
    private store: Store<AppState>,
    private actions$: Actions
  ) { }
/*
  loadRatings$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.loadRatings),
    switchMap((a) =>
      {
        const res = this.service.getAll(a.meta.country).pipe(map(data => {
          const result = fromActions.loadRatingsSuccess({ payload: data, meta: a.meta });
          return result;
        }));

        return res;
      }
    )

  ));*/
  
  loadRatings$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.loadRatings),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(s => s.ratings)))
    )),
    filter(([_, state]) => ratingsNorAlreadyFetched(state)),
    switchMap(([a, _]) =>
      this.service.getAll(a.meta.country).pipe(
        map(data => fromActions.loadRatingsSuccess({ payload: data, meta: a.meta })),
        catchError(res => of(fromActions.loadRatingsFailed({
          payload: {
            status: '' + res.status
          },
          meta: a.meta
        })
        ))
      )
    )
  ));
}
