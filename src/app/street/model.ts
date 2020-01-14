export interface IStreet {
  parent: string;
  code: string;
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
  const street = obj as IStreet;
  if (street.parent && street.name) {
    return true;
  }

  return false;
}