import { createAction, props } from '@ngrx/store';

import { ICity, ICityError } from './model';

export const LOAD = '[CITIES]: LOAD';
export const LOAD_SUCCEEDED = '[CITIES]: LOAD_SUCCEEDED';
export const LOAD_FAILED = '[CITIES]: LOAD_FAILED';

export const load = createAction(LOAD);
export const loadSuccess = createAction(LOAD_SUCCEEDED, props<{ payload: ICity[] }>());
export const loadFailed = createAction(LOAD_FAILED, props<{ payload: ICityError }>());
