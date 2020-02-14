import { createAction, props, Action } from '@ngrx/store';

import { IRating, IRatingError } from './model';

export interface MetaData {
  country: string;
}

export const LOAD = '[RATINGS]: LOAD';
export const LOAD_STARTED = '[RATINGS]: LOAD_STARTED';
export const LOAD_SUCCEEDED = '[RATINGS]: LOAD_SUCCEEDED';
export const LOAD_FAILED = '[RATINGS]: LOAD_FAILED';

export const loadRatings = createAction(LOAD, props<{ meta: MetaData }>());
export const loadRatingsSuccess = createAction(LOAD_SUCCEEDED, props<{ meta: MetaData; payload: IRating[] }>());
export const loadRatingsFailed = createAction(LOAD_FAILED, props<{ meta: MetaData; payload: IRatingError }>());
