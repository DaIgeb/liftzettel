import { createAction, props } from '@ngrx/store';

import { IStreet, IStreetError } from './model';

export const LOAD = '[STREETS]: LOAD';
export const LOAD_SUCCEEDED = '[STREETS]: LOAD_SUCCEEDED';
export const LOAD_FAILED = '[STREETS]: LOAD_FAILED';

export const load = createAction(LOAD);
export const loadSuccess = createAction(LOAD_SUCCEEDED, props<{ payload: IStreet[] }>());
export const loadFailed = createAction(LOAD_FAILED, props<{ payload: IStreetError }>());
