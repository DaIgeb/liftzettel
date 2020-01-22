import { Action } from 'redux';

import { IRatingState, initialState } from './model';
import { RatingAPIAction, RatingAPIActions } from './actions';
import { QuestionaireAPIActions, QuestionaireAPIAction } from './questionaire.actions';

export function ratingReducer(
  state: IRatingState = initialState,
  a: Action,
): IRatingState {
  const action = a as RatingAPIAction;
  switch (action.type) {
    case RatingAPIActions.LOAD_STARTED:
      return {
        ...state,
        ratings: {
          ...state.ratings,
          items: state.ratings.items.filter(i => i.parent !== action.meta.country),
          loading: true,
          fetched: false,
          error: undefined,
        }
      };
    case RatingAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        ratings: {
          ...state.ratings,
          items: [
            ...state.ratings.items.filter(i => i.parent !== action.meta.country),
            ...action.payload
          ],
          loading: false,
          fetched: true,
          error: undefined,
        }
      };
    case RatingAPIActions.LOAD_FAILED:
      return {
        ...state,
        ratings: {
          items: state.ratings.items.filter(i => !i.parent.startsWith(action.meta.country)),
          fetched: false,
          loading: false,
          error: action.error
        }
      };
  }
  const questionaireAction = a as QuestionaireAPIAction;
  switch (questionaireAction.type) {
    case QuestionaireAPIActions.LOAD_STARTED:
      return {
        ...state,
        questionaires: {
          ...state.questionaires,
          items: [],
          loading: true,
          fetched: false,
          error: undefined,
        }
      };
    case QuestionaireAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        questionaires: {
          ...state.questionaires,
          items: questionaireAction.payload,
          loading: false,
          fetched: true,
          error: undefined,
        }
      };
    case QuestionaireAPIActions.LOAD_FAILED:
      return {
        ...state,
        questionaires: {
          items: [],
          fetched: false,
          loading: false,
          error: questionaireAction.error
        }
      };
  }

  return state;
};
