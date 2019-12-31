import { ICountryState, initialState as initialCountryState } from '../country/model';
import { ICityState, initialState as initialCityState } from '../city/model';
import { IStateState, initialState as initialStateState } from '../state/model';

export type AppState = {
  countries: ICountryState,
  cities: ICityState,
  states: IStateState
} &
  Partial<{
    routes: string;
    feedback: unknown;
  }>;

export function initialAppState(): AppState {
  return {
    countries: initialCountryState,
    cities: initialCityState,
    states: initialStateState
  };
}