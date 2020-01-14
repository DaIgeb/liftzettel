import { Action } from 'redux';

import { IRatingState, initialState } from './model';
import { RatingAPIAction, RatingAPIActions } from './actions';

export function ratingReducer(
  state: IRatingState = initialState,
  a: Action,
): IRatingState {
  const action = a as RatingAPIAction;
  switch (action.type) {
    case RatingAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: state.items.filter(i => i.parent !== action.meta.country),
        loading: true,
        fetched: false,
        error: undefined,
      };
    case RatingAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: [
          ...state.items.filter(i => i.parent !== action.meta.country),
          ...action.payload
        ],
        loading: false,
        fetched: true,
        error: undefined,
      };
    case RatingAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: state.items.filter(i => !i.parent.startsWith(action.meta.country)),
        fetched: false,
        loading: false,
        error: action.error,
      };
  }

  return state;
};
