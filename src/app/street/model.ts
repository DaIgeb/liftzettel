export interface IStreet {
  city: string;
  name: string;
}

export interface IStreetError {
  status: string;
 }

export interface IStreetState {
  loading: boolean;
  fetched: boolean;
  items: IStreet[];
  error: boolean | undefined;
}

export const initialState: IStreetState = {
  items: [],
  loading: false,
  fetched: false,
  error: undefined,
};

export function isStreet(obj: any): obj is IStreet {
  if (obj.city && obj.name) {
    return true;
  }

  return false;
}