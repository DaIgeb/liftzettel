import { ICountryState, initialState as initialCountryState } from '../country/model';
import { ICityState, initialState as initialCityState } from '../city/model';
import { IStateState, initialState as initialStateState } from '../state/model';
import { IStreetState, initialState as initialStreetState } from '../street/model';
import { IRatingState, initialState as initialRatingState } from '../rating/model';
import { IArrangementState, initialState as initialArrangementState } from '../arrangement/model';
import { IEnclosureState, initialState as initialEnclosureState } from '../enclosure/model';

export type AppState = {
  countries: ICountryState,
  cities: ICityState,
  states: IStateState,
  streets: IStreetState,
  ratings: IRatingState,
  arrangements: IArrangementState,
  enclosures: IEnclosureState
} &
  Partial<{
    routes: string;
    feedback: unknown;
  }>;

export function initialAppState(): AppState {
  return {
    countries: initialCountryState,
    cities: initialCityState,
    states: initialStateState,
    streets: initialStreetState,
    ratings: initialRatingState,
    arrangements: initialArrangementState,
    enclosures: initialEnclosureState
  };
}