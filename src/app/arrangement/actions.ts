import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IArrangement, IArrangementError } from './model';
import { UPDATE_LOCATION } from '@angular-redux/router';

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
  static readonly CREATE = '[ARRANGEMENT]: CREATE';
  static readonly CREATE_STARTED = '[ARRANGEMENT]: CREATE_STARTED';
  static readonly CREATE_SUCCEEDED = '[ARRANGEMENT]: CREATE_SUCCEEDED';
  static readonly CREATE_FAILED = '[ARRANGEMENT]: CREATE_FAILED';

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

  @dispatch()
  create = (data: IArrangement[]): ArrangementAPIAction => ({
    type: ArrangementAPIActions.CREATE,
    meta: { },
    payload: data
  });

  createStarted = (): ArrangementAPIAction => ({
    type: ArrangementAPIActions.CREATE_STARTED,
    meta: { },
  });

  createSucceeded = (
    payload: IArrangement[],
  ): ArrangementAPIAction => ({
    type: ArrangementAPIActions.CREATE_SUCCEEDED,
    meta: { },
    payload: payload,
  });

  createFailed = (
    error: IArrangementError,
  ): ArrangementAPIAction<IArrangementError> => ({
    type: ArrangementAPIActions.CREATE_FAILED,
    meta: { },
    payload: error,
    error: true,
  });
}