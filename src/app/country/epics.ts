import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-es6-compat';

import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { ICountry, ICountryError } from './model';
import { CountryAPIAction, CountryAPIActions } from './actions';
import { CountryService } from './country.service';

const countriesNotAlreadyFetched = (
  state: AppState,
): boolean =>
  (
    state.countries &&
    !state.countries.fetched &&
    !state.countries.loading &&
    state.countries.items.length === 0
  );


@Injectable({
  providedIn: 'root'
})
export class CountryEpics {
  constructor(
    private service: CountryService,
    private actions: CountryAPIActions,
  ) { }

  createEpic() {
    return this.createLoadEpic();
  }

  private createLoadEpic(): Epic<
    CountryAPIAction<ICountry[] | ICountryError>,
    CountryAPIAction<ICountry[] | ICountryError>,
    AppState
  > {
    return (action$, state$) =>
      action$.pipe(
        filter((a) => a.type === CountryAPIActions.LOAD),
        filter(() => countriesNotAlreadyFetched(state$.value)),
        switchMap(() =>
          this.service.getAll().pipe(
            map(data => this.actions.loadSucceeded(data)),
            catchError(res => of(
              this.actions.loadFailed({
                status: '' + res.status,
              }),
            )),
            startWith(this.actions.loadStarted()))
        ));
  }
}