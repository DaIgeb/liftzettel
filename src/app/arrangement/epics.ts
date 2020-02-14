import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of, EMPTY } from 'rxjs';
import { catchError, filter, map, switchMap, concatMap, withLatestFrom, tap } from 'rxjs/operators';

import { AppState } from '../store/model';
import { IArrangementState } from './model';
import * as fromActions from './actions';
import { ArrangementService } from './arrangement.service';
import { Router } from '@angular/router';

const notAlreadyFetched = (
  state: IArrangementState,
): boolean =>
  (
    state && (
      !state.fetched ||
      !state.loading ||
      state.items.length === 0
    )
  );


@Injectable()
export class ArrangementEpics {
  constructor(
    private service: ArrangementService,
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router
  ) { }

  loadArrangements$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.loadArrangements),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(select(s => s.arrangements)))
    )),
    filter(([_, state]) => notAlreadyFetched(state)),
    switchMap(([, _]) =>
      this.service.getAll().pipe(
        map(data => fromActions.loadSucceeded({ payload: data })),
        catchError(res => of(
          fromActions.loadFailed({
            payload: {
              status: '' + res.status,
            }
          }),
        )))
    )));

  createArrangements$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.createArrangements),
    switchMap((a) =>
      this.service.create(a.payload).pipe(
        map(data => fromActions.createArrangementsSuccess({ payload: data })),
        catchError(res => of(
          fromActions.createFailed({
            payload: {
              status: '' + res.status,
            }
          }),
        ))
      )))
  );

  redirectToRating$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.createArrangementsSuccess),
    tap(a => this.router.navigate(['rating/' + a.payload[0].code + '/new'])),
    switchMap(() => EMPTY
    )));
}