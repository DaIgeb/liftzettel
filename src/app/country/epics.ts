import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, filter, map, switchMap, concatMap, withLatestFrom, tap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { ICountryState } from './model';
import * as fromActions from './actions';
import { CountryService } from './country.service';

const countriesNotAlreadyFetched = (
  state: ICountryState,
): boolean =>
  (
    state && (
      !state.fetched ||
      !state.loading ||
      state.items.length === 0
    )
  );

@Injectable()
export class CountryEpics {
  constructor(
    private service: CountryService,
    private store: Store<AppState>,
    private actions$: Actions,
  ) { }

  loadCountries$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.load),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(s => s.countries)))
    )),
    filter(([_, state]) => countriesNotAlreadyFetched(state)),
    switchMap(([, _]) =>
      this.service.getAll().pipe(
        map(data => fromActions.loadSuccess({ payload: data })),
        catchError(res => of(
          fromActions.loadFailed({
            payload: { status: '' + res.status }
          }),
        )))
    )));
}
