import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { countryReducer } from '../country/reducer';
import { cityReducer } from '../city/reducer';
import { stateReducer } from '../state/reducer';


export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    countries: countryReducer,
    cities: cityReducer,
    states: stateReducer,
    router: routerReducer,
  }),
);