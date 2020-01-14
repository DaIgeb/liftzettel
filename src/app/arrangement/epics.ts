import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-es6-compat';

import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { IArrangement, IArrangementError } from './model';
import { ArrangementAPIAction, ArrangementAPIActions } from './actions';
import { ArrangementService } from './arrangement.service';

const notAlreadyFetched = (
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
export class ArrangementEpics {
  constructor(
    private service: ArrangementService,
    private actions: ArrangementAPIActions,
  ) { }

  createEpic() {
    return this.createLoadEpic();
  }

  private createLoadEpic(): Epic<
    ArrangementAPIAction<IArrangement[] | IArrangementError>,
    ArrangementAPIAction<IArrangement[] | IArrangementError>,
    AppState
  > {
    return (action$, state$) =>
      action$.pipe(
        filter((a) => a.type === ArrangementAPIActions.LOAD),
        filter(() => notAlreadyFetched(state$.value)),
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