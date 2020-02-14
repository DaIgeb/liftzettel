import { createAction, props } from '@ngrx/store';

import { IArrangement, IArrangementError } from './model';

export const LOAD = '[ARRANGEMENT]: LOAD';
export const LOAD_STARTED = '[ARRANGEMENT]: LOAD_STARTED';
export const LOAD_SUCCEEDED = '[ARRANGEMENT]: LOAD_SUCCEEDED';
export const LOAD_FAILED = '[ARRANGEMENT]: LOAD_FAILED';
export const CREATE = '[ARRANGEMENT]: CREATE';
export const CREATE_STARTED = '[ARRANGEMENT]: CREATE_STARTED';
export const CREATE_SUCCEEDED = '[ARRANGEMENT]: CREATE_SUCCEEDED';
export const CREATE_FAILED = '[ARRANGEMENT]: CREATE_FAILED';

export const loadArrangements = createAction(LOAD);
export const loadSucceeded = createAction(LOAD_SUCCEEDED, props<{ payload: IArrangement[] }>());
export const loadFailed = createAction(LOAD_FAILED, props<{ payload: IArrangementError }>());

export const createArrangements = createAction(CREATE, props<{ payload: IArrangement[] }>());
export const createArrangementsSuccess = createAction(CREATE_SUCCEEDED, props<{ payload: IArrangement[] }>());
export const createFailed = createAction(CREATE_FAILED, props<{ payload: IArrangementError }>());

