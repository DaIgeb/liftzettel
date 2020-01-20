import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IEnclosure, IEnclosureError } from './model';
import { UPDATE_LOCATION } from '@angular-redux/router';

export type Payload = IEnclosure[] | IEnclosureError;

export interface MetaData {
}

export type EnclosureAPIAction<T extends Payload = IEnclosure[]> = FluxStandardAction<
  string,
  T,
  MetaData
>;

@Injectable({
  providedIn: 'root'
})
export class EnclosureAPIActions {
  static readonly LOAD = '[ENCLOSURE]: LOAD';
  static readonly LOAD_STARTED = '[ENCLOSURE]: LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = '[ENCLOSURE]: LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = '[ENCLOSURE]: LOAD_FAILED';
  static readonly SAVE = '[ENCLOSURE]: SAVE';
  static readonly SAVE_STARTED = '[ENCLOSURE]: SAVE_STARTED';
  static readonly SAVE_SUCCEEDED = '[ENCLOSURE]: SAVE_SUCCEEDED';
  static readonly SAVE_FAILED = '[ENCLOSURE]: SAVE_FAILED';

  @dispatch()
  load = (): EnclosureAPIAction => ({
    type: EnclosureAPIActions.LOAD,
    meta: {},
  });

  loadStarted = (): EnclosureAPIAction => ({
    type: EnclosureAPIActions.LOAD_STARTED,
    meta: {},
  });

  loadSucceeded = (
    payload: IEnclosure[],
  ): EnclosureAPIAction<IEnclosure[]> => ({
    type: EnclosureAPIActions.LOAD_SUCCEEDED,
    meta: {},
    payload,
  });

  loadFailed = (
    error: IEnclosureError,
  ): EnclosureAPIAction<IEnclosureError> => ({
    type: EnclosureAPIActions.LOAD_FAILED,
    meta: {},
    payload: error,
    error: true,
  });

  @dispatch()
  create = (data: IEnclosure[]): EnclosureAPIAction => ({
    type: EnclosureAPIActions.SAVE,
    meta: {},
    payload: data
  });

  createSucceeded = (
    payload: IEnclosure[],
  ): FluxStandardAction<string, string, {}> => ({
    type: UPDATE_LOCATION,
    meta: {},
    payload: 'arrangement/' + payload[0].code,
  });

  createStarted = (): EnclosureAPIAction => ({
    type: EnclosureAPIActions.SAVE_STARTED,
    meta: {},
  });


  createFailed = (
    error: IEnclosureError,
  ): EnclosureAPIAction<IEnclosureError> => ({
    type: EnclosureAPIActions.SAVE_FAILED,
    meta: {},
    payload: error,
    error: true,
  });
}