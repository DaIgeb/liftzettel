import { Injectable } from '@angular/core';
import { Epic, combineEpics } from 'redux-observable-es6-compat';

import { of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { IEnclosure, IEnclosureError } from './model';
import { EnclosureAPIAction, EnclosureAPIActions } from './actions';
import { EnclosureService } from './enclosure.service';

const notAlreadyFetched = (
  state: AppState,
): boolean =>
  (
    state.enclosures &&
    !state.enclosures.fetched &&
    !state.enclosures.loading &&
    state.enclosures.items.length === 0
  );


@Injectable({
  providedIn: 'root'
})
export class EnclosureEpics {
  constructor(
    private service: EnclosureService,
    private actions: EnclosureAPIActions,
  ) { }

  createEpic() {
    return combineEpics(
      this.createLoadEpic(),
      this.createSaveEpic());
  }

  private createLoadEpic(): Epic<
    EnclosureAPIAction<IEnclosure[] | IEnclosureError>,
    EnclosureAPIAction<IEnclosure[] | IEnclosureError>,
    AppState
  > {
    return (action$, state$) =>
      action$.pipe(
        filter((a) => a.type === EnclosureAPIActions.LOAD),
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

  private createSaveEpic(): Epic<
    EnclosureAPIAction<IEnclosure[] | IEnclosureError> | { type: string; payload: string; },
    EnclosureAPIAction<IEnclosure[] | IEnclosureError> | { type: string; payload: string; },
    AppState
  > {
    return (action$, state$) =>
      action$.pipe(
        filter((a) => a.type === EnclosureAPIActions.SAVE),
        switchMap((a) =>
          this.service.create(a.payload as IEnclosure[]).pipe(
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