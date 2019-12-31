export interface ICountry {
  isoCode: string;
  name: string;
}

export interface ICountryError {
  status: string;
 }

export interface ICountryState {
  loading: boolean;
  fetched: boolean;
  items: ICountry[];
  error: boolean | undefined;
}

export const initialState: ICountryState = {
  items: [],
  loading: false,
  fetched: false,
  error: undefined,
};

