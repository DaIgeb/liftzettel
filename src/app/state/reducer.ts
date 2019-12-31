import { Action } from 'redux';

import { IStateState, initialState } from './model';
import { StateAPIAction, StateAPIActions } from './actions';

export function stateReducer(
  state: IStateState = initialState,
  a: Action,
): IStateState {
  const action = a as StateAPIAction;
  switch (action.type) {
    case StateAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: [],
        loading: true,
        fetched: false,
        error: undefined,
      };
    case StateAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        fetched: true,
        error: undefined,
      };
    case StateAPIActions.LOAD_FAILED:
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
