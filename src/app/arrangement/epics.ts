import { Injectable } from '@angular/core';
import { Epic, combineEpics } from 'redux-observable-es6-compat';

import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { IArrangement, IArrangementError } from './model';
import { ArrangementAPIAction, ArrangementAPIActions } from './actions';
import { ArrangementService } from './arrangement.service';
import { FluxStandardAction } from 'flux-standard-action';

const notAlreadyFetched = (
  state: AppState,
): boolean =>
  (
    state.arrangements &&
    !state.arrangements.fetched &&
    !state.arrangements.loading &&
    state.arrangements.items.length === 0
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
    return combineEpics(
      this.createLoadEpic(),
      this.createCreateEpic()
    );
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


  private createCreateEpic(): Epic<
    ArrangementAPIAction<IArrangement[] | IArrangementError> | FluxStandardAction<string, string, {}>,
    ArrangementAPIAction<IArrangement[] | IArrangementError> | FluxStandardAction<string, string, {}>,
    AppState
  > {
    return (action$, state$) =>
      action$.pipe(
        filter((a) => a.type === ArrangementAPIActions.CREATE),
        switchMap((a) =>
          this.service.create(a.payload as IArrangement[]).pipe(
            map(data => this.actions.createSucceeded(data)),
            catchError(res => of(
              this.actions.createFailed({
                status: '' + res.status,
              }),
            )),
            startWith(this.actions.createStarted()))
        ));
  }

}