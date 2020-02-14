import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom, concatMap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { IStreetState } from './model';
import * as fromActions from './actions';
import { StreetService } from './street.service';

const citiesNotAlreadyFetched = (
  state: IStreetState,
): boolean =>
  (
    state && (
      !state.fetched ||
      !state.loading ||
      state.items.length === 0
    )
  );

@Injectable()
export class StreetEpics {
  constructor(
    private service: StreetService,
    private store: Store<AppState>,
    private actions$: Actions,
  ) { }

  loadStreets$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.load),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(s => s.streets)))
    )),
    filter(([_, state]) => citiesNotAlreadyFetched(state)),
    switchMap(([, _]) =>
      this.service.getAll().pipe(
        map(data => fromActions.loadSuccess({ payload: data })),
        catchError(res => of(
          fromActions.loadFailed({
            payload: {
              status: '' + res.status,
            }
          }),
        )))
    )));
}