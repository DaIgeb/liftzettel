import { Action } from 'redux';

import { IArrangementState, initialState } from './model';
import { ArrangementAPIAction, ArrangementAPIActions } from './actions';

export function arrangementReducer(
  state: IArrangementState = initialState,
  a: Action,
): IArrangementState {
  const action = a as ArrangementAPIAction;
  switch (action.type) {
    case ArrangementAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: [],
        loading: true,
        fetched: false,
        error: undefined,
      };
    case ArrangementAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        fetched: true,
        error: undefined,
      };
    case ArrangementAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: [],
        fetched: false,
        loading: false,
        error: action.error,
      };
      case ArrangementAPIActions.CREATE_SUCCEEDED:
        return {
          ...state,
          items: [],
          fetched: false,
          loading: false,
          error: undefined
        };
  }

  return state;
};
