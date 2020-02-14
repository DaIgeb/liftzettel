import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../store/model';
import { ICity, ICityError, ICityState } from './model';
import * as fromActions from './actions';
import { CityService } from './city.service';

const citiesNotAlreadyFetched = (
  state: ICityState,
): boolean =>
  (
    state && (
      !state.fetched ||
      !state.loading ||
      state.items.length === 0
    )
  );


@Injectable()
export class CityEpics {
  constructor(
    private service: CityService,
    private store: Store<AppState>,
    private actions$: Actions,
  ) { }

  loadCities$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.LOAD),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(s => s.cities)))
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
