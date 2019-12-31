import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { ICountry, ICountryError } from './model';

// Flux-standard-action gives us stronger typing of our actions.
export type Payload = ICountry[] | ICountryError;

export interface MetaData {
  //animalType: AnimalType;
}

export type CountryAPIAction<T extends Payload = ICountry[]> = FluxStandardAction<
  string, 
  T,
  MetaData
>;

@Injectable({
  providedIn: 'root'
})
export class CountryAPIActions {
  static readonly LOAD = '[COUNTRIES]: LOAD';
  static readonly LOAD_STARTED = '[COUNTRIES]: LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = '[COUNTRIES]: LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = '[COUNTRIES]: LOAD_FAILED';

  @dispatch()
  load = (): CountryAPIAction => ({
    type: CountryAPIActions.LOAD,
    meta: { },
  });

  loadStarted = (): CountryAPIAction => ({
    type: CountryAPIActions.LOAD_STARTED,
    meta: { },
  });

  loadSucceeded = (
    payload: ICountry[],
  ): CountryAPIAction<ICountry[]> => ({
    type: CountryAPIActions.LOAD_SUCCEEDED,
    meta: { },
    payload,
  });

  loadFailed = (
    error: ICountryError,
  ): CountryAPIAction<ICountryError> => ({
    type: CountryAPIActions.LOAD_FAILED,
    meta: { },
    payload: error,
    error: true,
  });
}