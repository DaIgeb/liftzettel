import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-es6-compat';

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
    state.streets &&
    !state.streets.fetched &&
    !state.streets.loading &&
    state.streets.items.length === 0
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
    return this.createLoadEpic();
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
}