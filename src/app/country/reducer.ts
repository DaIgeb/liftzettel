import { createReducer, on } from '@ngrx/store';

import { ICountryState, initialState } from './model';
import * as fromActions from './actions';

export const countryReducer = createReducer(
  initialState,
  on(fromActions.load, (state) => ({
    ...state,
    items: [],
    loading: true,
    fetched: false,
    error: undefined,
  })),
  on(fromActions.loadSuccess, (state, action) => (
    {
      ...state,
      items: action.payload,
      loading: false,
      fetched: true,
      error: undefined,
    }
  )),
  on(fromActions.loadFailed, (state) => (
    {
      ...state,
      items: [],
      fetched: false,
      loading: false,
      error: true
    }
  )),
);
