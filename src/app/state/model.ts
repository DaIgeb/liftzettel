export interface IState {
  code: string;
  parent: string;
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

export function isState(obj: any): obj is IState {
  const state = obj as IState;
  if (state.parent && state.code) {
    return true;
  }

  return false;
}