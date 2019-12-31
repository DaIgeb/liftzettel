export interface IState {
  countryIsoCode: string;
  code: string;
  name: string;
}

export interface IStateError {
  status: string;
 }

export interface IStateState {
  loading: boolean;
  fetched: boolean;
  items: IState[];
  error: boolean | undefined;
}

export const initialState: IStateState = {
  items: [],
  loading: false,
  fetched: false,
  error: undefined,
};
