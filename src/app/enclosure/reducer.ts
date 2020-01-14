import { Action } from 'redux';

import { IEnclosureState, initialState } from './model';
import { EnclosureAPIAction, EnclosureAPIActions } from './actions';

export function enclosureReducer(
  state: IEnclosureState = initialState,
  a: Action,
): IEnclosureState {
  const action = a as EnclosureAPIAction;
  switch (action.type) {
    case EnclosureAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: [],
        loading: true,
        fetched: false,
        error: undefined,
      };
    case EnclosureAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        fetched: true,
        error: undefined,
      };
    case EnclosureAPIActions.LOAD_FAILED:
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
