import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, filter, map, switchMap, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../store/model';
import { IEnclosureState } from './model';
import * as fromActions from './actions';
import { EnclosureService } from './enclosure.service';

const notAlreadyFetched = (
  state: IEnclosureState,
): boolean =>
  (
    state && (
      !state.fetched ||
      !state.loading ||
      state.items.length === 0
    )
  );


@Injectable()
export class EnclosureEpics {
  constructor(
    private service: EnclosureService,
    private store: Store<AppState>,
    private actions$: Actions,
  ) { }

  loadStreets$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.load),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(s => s.enclosures)))
    )),
    filter(([_, state]) => notAlreadyFetched(state)),
    switchMap(([, _]) =>
      this.service.getAll().pipe(
        map(data => fromActions.loadSuccess({ payload: data })),
        catchError(res => of(
          fromActions.loadFailed({ payload: {
            status: '' + res.status,}
          }),
        )))
    )));

  saveEnclosure$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.create),
    switchMap((a: any) =>
      this.service.create(a.payload).pipe(
        map(data => fromActions.createSuccess({ payload: data })),
        catchError(res => of(
          fromActions.createFailed({
            payload: {
              status: '' + res.status,
            }
          })
        ))
      )
    )
  ));
}
