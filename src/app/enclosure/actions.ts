import { createAction, props } from '@ngrx/store';

import { IEnclosure, IEnclosureError } from './model';

export const LOAD = '[ENCLOSURE]: LOAD';
export const LOAD_SUCCEEDED = '[ENCLOSURE]: LOAD_SUCCEEDED';
export const LOAD_FAILED = '[ENCLOSURE]: LOAD_FAILED';
export const SAVE = '[ENCLOSURE]: SAVE';
export const SAVE_SUCCEEDED = '[ENCLOSURE]: SAVE_SUCCEEDED';
export const SAVE_FAILED = '[ENCLOSURE]: SAVE_FAILED';

export const load = createAction(LOAD);
export const loadSuccess = createAction(LOAD_SUCCEEDED, props<{ payload: IEnclosure[] }>());
export const loadFailed = createAction(LOAD_FAILED, props<{ payload: IEnclosureError }>());

export const create = createAction(SAVE, props<{ payload: IEnclosure[] }>());
export const createSuccess = createAction(SAVE_SUCCEEDED, props<{ payload: IEnclosure[] }>());
export const createFailed = createAction(SAVE_FAILED, props<{ payload: IEnclosureError }>());
