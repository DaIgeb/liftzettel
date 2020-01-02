import { Action } from 'redux';

import { IStreetState, initialState } from './model';
import { StreetAPIAction, StreetAPIActions } from './actions';

export function streetReducer(
  state: IStreetState = initialState,
  a: Action,
): IStreetState {
  const action = a as StreetAPIAction;
  switch (action.type) {
    case StreetAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: [],
        loading: true,
        fetched: false,
        error: undefined,
      };
    case StreetAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        fetched: true,
        error: undefined,
      };
    case StreetAPIActions.LOAD_FAILED:
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
