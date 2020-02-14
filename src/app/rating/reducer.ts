import { createReducer, on } from '@ngrx/store';

import { initialState } from './model';
import * as fromActions from './actions';
import * as fromQuestionnaireActions from './questionaire.actions';

export const ratingReducer = createReducer(
  initialState,
  on(fromActions.loadRatings, (state, action) => (
    {
      ...state,
      ratings: {
        ...state.ratings,
        items: state.ratings.items.filter(i => i.parent !== action.meta.country),
        loading: true,
        fetched: false,
        error: undefined,
      }
    }
  )),
  on(fromActions.loadRatingsSuccess, (state, action) => ({
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
  })),
  on(fromActions.loadRatingsFailed, (state, action) => (
    {
      ...state,
      ratings: {
        items: state.ratings.items.filter(i => !i.parent.startsWith(action.meta.country)),
        fetched: false,
        loading: false,
        error: true
      }
    }
  )),
  on(fromQuestionnaireActions.loadQuestionnaires, (state) => ({
    ...state,
    questionaires: {
      ...state.questionaires,
      items: [],
      loading: true,
      fetched: false,
      error: undefined,
    }
  })),
  on(fromQuestionnaireActions.loadQuestionnairesSucceeded, (state, action) => ({
    ...state,
    questionaires: {
      ...state.questionaires,
      items: action.payload,
      loading: false,
      fetched: true,
      error: undefined,
    }
  })),
  on(fromQuestionnaireActions.loadQuestionnairesFailed, (state, action) => (
    {
      ...state,
      questionaires: {
        items: [],
        fetched: false,
        loading: false,
        error: action.error
      }
    }
  ))
);