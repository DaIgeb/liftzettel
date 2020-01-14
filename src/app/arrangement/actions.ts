import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IArrangement, IArrangementError } from './model';

export type Payload = IArrangement[] | IArrangementError;

export interface MetaData {
}

export type ArrangementAPIAction<T extends Payload = IArrangement[]> = FluxStandardAction<
  string, 
  T,
  MetaData
>;

@Injectable({
  providedIn: 'root'
})
export class ArrangementAPIActions {
  static readonly LOAD = '[ARRANGEMENT]: LOAD';
  static readonly LOAD_STARTED = '[ARRANGEMENT]: LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = '[ARRANGEMENT]: LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = '[ARRANGEMENT]: LOAD_FAILED';

  @dispatch()
  load = (): ArrangementAPIAction => ({
    type: ArrangementAPIActions.LOAD,
    meta: { },
  });

  loadStarted = (): ArrangementAPIAction => ({
    type: ArrangementAPIActions.LOAD_STARTED,
    meta: { },
  });

  loadSucceeded = (
    payload: IArrangement[],
  ): ArrangementAPIAction<IArrangement[]> => ({
    type: ArrangementAPIActions.LOAD_SUCCEEDED,
    meta: { },
    payload,
  });

  loadFailed = (
    error: IArrangementError,
  ): ArrangementAPIAction<IArrangementError> => ({
    type: ArrangementAPIActions.LOAD_FAILED,
    meta: { },
    payload: error,
    error: true,
  });
}