export interface ICity {
  code: string;
  parent: string;
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

export function isCity(obj: any): obj is ICity {
  const city = obj as ICity;
  if (city.parent && city.code && city.zipCode) {
    return true;
  }

  return false;
}