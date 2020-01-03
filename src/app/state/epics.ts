import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-es6-compat';

import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { IState, IStateError } from './model';
import { StateAPIAction, StateAPIActions } from './actions';
import { StateService } from './state.service';

const notAlreadyFetched = (
  state: AppState,
): boolean =>
  (
    state.states &&
    !state.states.fetched &&
    !state.states.loading &&
    state.states.items.length === 0
  );


@Injectable({
  providedIn: 'root'
})
export class StateEpics {
  constructor(
    private service: StateService,
    private actions: StateAPIActions,
  ) { }

  createEpic() {
    return this.createLoadEpic();
  }

  private createLoadEpic(): Epic<
    StateAPIAction<IState[] | IStateError>,
    StateAPIAction<IState[] | IStateError>,
    AppState
  > {
    return (action$, state$) =>
      action$.pipe(
        filter((a) => a.type === StateAPIActions.LOAD),
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