export interface IArrangement {
  parent: string;
  code: string;
  name: string;
}

export interface IArrangementError {
  status: string;
 }

export interface IArrangementState {
  loading: boolean;
  fetched: boolean;
  items: IArrangement[];
  error: boolean | undefined;
}

export const initialState: IArrangementState = {
  items: [],
  loading: false,
  fetched: false,
  error: undefined,
};

export function isStreet(obj: any): obj is IArrangement {
  const arrangement = obj as IArrangement;
  if (arrangement.parent && arrangement.name) {
    return true;
  }

  return false;
}