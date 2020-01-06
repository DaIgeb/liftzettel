import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-es6-compat';

import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { IStreet, IStreetError } from './model';
import { StreetAPIAction, StreetAPIActions } from './actions';
import { StreetService } from './street.service';

const citiesNotAlreadyFetched = (
  state: AppState,
): boolean =>
  (
    state.streets &&
    !state.streets.fetched &&
    !state.streets.loading &&
    state.streets.items.length === 0
  );


@Injectable({
  providedIn: 'root'
})
export class StreetEpics {
  constructor(
    private service: StreetService,
    private actions: StreetAPIActions,
  ) { }

  createEpic() {
    return this.createLoadEpic();
  }

  private createLoadEpic(): Epic<
    StreetAPIAction<IStreet[] | IStreetError>,
    StreetAPIAction<IStreet[] | IStreetError>,
    AppState
  > {
    return (action$, state$) =>
      action$.pipe(
        filter((a) => a.type === StreetAPIActions.LOAD),
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