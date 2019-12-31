import { Action } from 'redux';

import { ICountryState, initialState } from './model';
import { CountryAPIAction, CountryAPIActions } from './actions';

export function countryReducer(
  state: ICountryState = initialState,
  a: Action,
): ICountryState {
  const action = a as CountryAPIAction;
  switch (action.type) {
    case CountryAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: [],
        loading: true,
        fetched: false,
        error: undefined,
      };
    case CountryAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        fetched: true,
        error: undefined,
      };
    case CountryAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: [],
        fetched: false,
        loading: false,
        error: action.error,
      };
  }

  return state;
};
