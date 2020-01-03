import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-es6-compat';

import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { ICity, ICityError } from './model';
import { CityAPIAction, CityAPIActions } from './actions';
import { CityService } from './city.service';

const citiesNotAlreadyFetched = (
  state: AppState,
): boolean =>
  (
    state.cities &&
    !state.cities.fetched &&
    !state.cities.loading &&
    state.cities.items.length === 0
  );


@Injectable({
  providedIn: 'root'
})
export class CityEpics {
  constructor(
    private service: CityService,
    private actions: CityAPIActions,
  ) { }

  createEpic() {
    return this.createLoadEpic();
  }

  private createLoadEpic(): Epic<
    CityAPIAction<ICity[] | ICityError>,
    CityAPIAction<ICity[] | ICityError>,
    AppState
  > {
    return (action$, state$) =>
      action$.pipe(
        filter((a) => a.type === CityAPIActions.LOAD),
        filter(() => citiesNotAlreadyFetched(state$.value)),
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