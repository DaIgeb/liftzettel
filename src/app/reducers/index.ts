import { combineReducers } from 'redux';
import { countryReducer } from '../country/reducer';
import { cityReducer } from '../city/reducer';
import { stateReducer } from '../state/reducer';
import { streetReducer } from '../street/reducer';
import { ratingReducer } from '../rating/reducer';
import { arrangementReducer } from '../arrangement/reducer';
import { enclosureReducer } from '../enclosure/reducer';
import { ActionReducer, MetaReducer, compose, ActionReducerMap, State, Action } from '@ngrx/store';
import { AppState } from '../store/model';
import { environment } from 'src/environments/environment';
import { InjectionToken } from '@angular/core';



export const rootReducer = new InjectionToken<
  ActionReducerMap<AppState, Action>
>('Root reducers token', {
  factory: () => ({
    countries: countryReducer,
    cities: cityReducer,
    states: stateReducer,
    streets: streetReducer,
    ratings: ratingReducer,
    arrangements: arrangementReducer,
    enclosures: enclosureReducer
  }),
});

// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];