export interface IEnclosure {
  parent: string;
  code: string;
  name: string;
}

export interface IEnclosureError {
  status: string;
 }

export interface IEnclosureState {
  loading: boolean;
  fetched: boolean;
  items: IEnclosure[];
  error: boolean | undefined;
}

export const initialState: IEnclosureState = {
  items: [],
  loading: false,
  fetched: false,
  error: undefined,
};

export function isEnclosure(obj: any): obj is IEnclosure {
  const enclosure = obj as IEnclosure;
  if (enclosure.parent && enclosure.name) {
    return true;
  }

  return false;
}