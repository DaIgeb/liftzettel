export interface ICity {
  countryCode: string;
  stateCode: string;
  zipCode: string;
  name: string;
}

export interface ICityError {
  status: string;
 }

export interface ICityState {
  loading: boolean;
  fetched: boolean;
  items: ICity[];
  error: boolean | undefined;
}

export const initialState: ICityState = {
  items: [],
  loading: false,
  fetched: false,
  error: undefined,
};
