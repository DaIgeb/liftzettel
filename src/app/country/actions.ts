import { createAction, props } from '@ngrx/store';

import { ICountry, ICountryError } from './model';

export const LOAD = '[COUNTRIES]: LOAD';
export const LOAD_STARTED = '[COUNTRIES]: LOAD_STARTED';
export const LOAD_SUCCEEDED = '[COUNTRIES]: LOAD_SUCCEEDED';
export const LOAD_FAILED = '[COUNTRIES]: LOAD_FAILED';

export const load = createAction(LOAD);
export const loadSuccess = createAction(LOAD_SUCCEEDED, props<{ payload: ICountry[] }>());
export const loadFailed = createAction(LOAD_FAILED, props<{ payload: ICountryError }>());
