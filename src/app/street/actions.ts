import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IStreet, IStreetError } from './model';

export type Payload = IStreet[] | IStreetError;

export interface MetaData {
}

export type StreetAPIAction<T extends Payload = IStreet[]> = FluxStandardAction<
  string, 
  T,
  MetaData
>;

@Injectable({
  providedIn: 'root'
})
export class StreetAPIActions {
  static readonly LOAD = '[STREETS]: LOAD';
  static readonly LOAD_STARTED = '[STREETS]: LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = '[STREETS]: LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = '[STREETS]: LOAD_FAILED';

  @dispatch()
  load = (): StreetAPIAction => ({
    type: StreetAPIActions.LOAD,
    meta: { },
  });

  loadStarted = (): StreetAPIAction => ({
    type: StreetAPIActions.LOAD_STARTED,
    meta: { },
  });

  loadSucceeded = (
    payload: IStreet[],
  ): StreetAPIAction<IStreet[]> => ({
    type: StreetAPIActions.LOAD_SUCCEEDED,
    meta: { },
    payload,
  });

  loadFailed = (
    error: IStreetError,
  ): StreetAPIAction<IStreetError> => ({
    type: StreetAPIActions.LOAD_FAILED,
    meta: { },
    payload: error,
    error: true,
  });
}