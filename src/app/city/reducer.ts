import { Action } from 'redux';

import { ICityState, initialState } from './model';
import { CityAPIAction, CityAPIActions } from './actions';

export function cityReducer(
  state: ICityState = initialState,
  a: Action,
): ICityState {
  const action = a as CityAPIAction;
  switch (action.type) {
    case CityAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: [],
        loading: true,
        fetched: false,
        error: undefined,
      };
    case CityAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        fetched: true,
        error: undefined,
      };
    case CityAPIActions.LOAD_FAILED:
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
