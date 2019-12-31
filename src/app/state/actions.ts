import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IState, IStateError } from './model';

export type Payload = IState[] | IStateError;

export interface MetaData {
}

export type StateAPIAction<T extends Payload = IState[]> = FluxStandardAction<
  string, 
  T,
  MetaData
>;

@Injectable({
  providedIn: 'root'
})
export class StateAPIActions {
  static readonly LOAD = '[STATES]: LOAD';
  static readonly LOAD_STARTED = '[STATES]: LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = '[STATES]: LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = '[STATES]: LOAD_FAILED';

  @dispatch()
  load = (): StateAPIAction => ({
    type: StateAPIActions.LOAD,
    meta: { },
  });

  loadStarted = (): StateAPIAction => ({
    type: StateAPIActions.LOAD_STARTED,
    meta: { },
  });

  loadSucceeded = (
    payload: IState[],
  ): StateAPIAction<IState[]> => ({
    type: StateAPIActions.LOAD_SUCCEEDED,
    meta: { },
    payload,
  });

  loadFailed = (
    error: IStateError,
  ): StateAPIAction<IStateError> => ({
    type: StateAPIActions.LOAD_FAILED,
    meta: { },
    payload: error,
    error: true,
  });
}