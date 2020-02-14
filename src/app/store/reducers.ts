import { combineReducers } from 'redux';
import { countryReducer } from '../country/reducer';
import { cityReducer } from '../city/reducer';
import { stateReducer } from '../state/reducer';
import { streetReducer } from '../street/reducer';
import { ratingReducer } from '../rating/reducer';
import { arrangementReducer } from '../arrangement/reducer';
import { enclosureReducer } from '../enclosure/reducer';


export const rootReducer =
  combineReducers({
    countries: countryReducer,
    cities: cityReducer,
    states: stateReducer,
    streets: streetReducer,
    ratings: ratingReducer,
    arrangements: arrangementReducer,
    enclosures: enclosureReducer
  });