import { createReducer, on } from '@ngrx/store';

import { initialState } from './model';
import * as fromActions from './actions';

export const arrangementReducer = createReducer(
  initialState,
  on(fromActions.loadArrangements, (state, action) => (
    {
      ...state,
      items: [],
      loading: true,
      fetched: false,
      error: undefined,
    }
  )),
  on(fromActions.loadSucceeded, (state, action) => (
    {
      ...state,
      items: action.payload,
      loading: false,
      fetched: true,
      error: undefined,
    }
  )),
  on(fromActions.loadFailed, (state, action) => (
    {
      ...state,
      items: [],
      fetched: false,
      loading: false,
      error: true
    }
  )),
  on(fromActions.createArrangementsSuccess, (state, action) => (
    {
      ...state,
      items: [],
      fetched: false,
      loading: false,
      error: undefined
    }
  )),
);
