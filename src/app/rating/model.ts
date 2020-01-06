export interface IRating {
  code: string;
  country: string;
  state: string;
  city: string;
  street: string;
  streetNumber: string;
  type: string;
  rating: number;
}

export interface IRatingError {
  status: string;
}

interface IRatingCore<TNextLevel> {
  total: number;
  byCode: { [index: string]: TNextLevel };
}

export interface IRatingState {
  loading: boolean;
  fetched: boolean;
  items: IRating[];
  error: boolean | undefined;
}

export const initialState: IRatingState = {
  items: [],
  loading: false,
  fetched: false,
  error: undefined,
};

