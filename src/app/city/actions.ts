import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { ICity, ICityError } from './model';

export type Payload = ICity[] | ICityError;

export interface MetaData {
}

export type CityAPIAction<T extends Payload = ICity[]> = FluxStandardAction<
  string, 
  T,
  MetaData
>;

@Injectable({
  providedIn: 'root'
})
export class CityAPIActions {
  static readonly LOAD = '[CITIES]: LOAD';
  static readonly LOAD_STARTED = '[CITIES]: LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = '[CITIES]: LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = '[CITIES]: LOAD_FAILED';

  @dispatch()
  load = (): CityAPIAction => ({
    type: CityAPIActions.LOAD,
    meta: { },
  });

  loadStarted = (): CityAPIAction => ({
    type: CityAPIActions.LOAD_STARTED,
    meta: { },
  });

  loadSucceeded = (
    payload: ICity[],
  ): CityAPIAction<ICity[]> => ({
    type: CityAPIActions.LOAD_SUCCEEDED,
    meta: { },
    payload,
  });

  loadFailed = (
    error: ICityError,
  ): CityAPIAction<ICityError> => ({
    type: CityAPIActions.LOAD_FAILED,
    meta: { },
    payload: error,
    error: true,
  });
}