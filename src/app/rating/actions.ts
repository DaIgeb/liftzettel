import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IRating, IRatingError } from './model';

// Flux-standard-action gives us stronger typing of our actions.
export type Payload = IRating[] | IRatingError;

export interface MetaData {
  country: string;
}

export type RatingAPIAction<T extends Payload = IRating[]> = FluxStandardAction<
  string,
  T,
  MetaData
>;

@Injectable({
  providedIn: 'root'
})
export class RatingAPIActions {
  static readonly LOAD = '[RATINGS]: LOAD';
  static readonly LOAD_STARTED = '[RATINGS]: LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = '[RATINGS]: LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = '[RATINGS]: LOAD_FAILED';

  @dispatch()
  load = (country: string): RatingAPIAction => ({
    type: RatingAPIActions.LOAD,
    meta: { country },
  });

  loadStarted = (country: string): RatingAPIAction => ({
    type: RatingAPIActions.LOAD_STARTED,
    meta: { country },
  });

  loadSucceeded = (
    payload: IRating[],
    country: string
  ): RatingAPIAction<IRating[]> => ({
    type: RatingAPIActions.LOAD_SUCCEEDED,
    meta: { country },
    payload,
  });

  loadFailed = (
    error: IRatingError,
    country: string
  ): RatingAPIAction<IRatingError> => ({
    type: RatingAPIActions.LOAD_FAILED,
    meta: { country },
    payload: error,
    error: true,
  });
}