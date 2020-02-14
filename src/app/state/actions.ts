import { createAction, props } from '@ngrx/store';

import { IState, IStateError } from './model';

export const LOAD = '[STATES]: LOAD';
export const LOAD_SUCCEEDED = '[STATES]: LOAD_SUCCEEDED';
export const LOAD_FAILED = '[STATES]: LOAD_FAILED';

export const load = createAction(LOAD);
export const loadSuccess = createAction(LOAD_SUCCEEDED, props<{ payload: IState[] }>());
export const loadFailed = createAction(LOAD_FAILED, props<{ payload: IStateError }>());
