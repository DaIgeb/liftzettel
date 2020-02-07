export interface IRating {
  code: string;
  parent: string;
  type: string;
  rating: number;
}

interface IYesNoQuestion extends IQuestionBase {
  type: "yesno"
}

interface IRatingQuestion extends IQuestionBase {
  type: "rating";
  min: number;
  max: number;
}

interface IQuestionBase {
  key?: string;
  value?: string;
  title: string;
  question: string;
  required: boolean;
  allowComments: boolean;
}

export type TQuestion = IRatingQuestion | IYesNoQuestion

export interface IQuestionaire {
  id: string;
  name: string;
  questions: TQuestion[];
}

export interface IQuestionaireError extends IRatingError {}

export interface IRatingError {
  status: string;
}

interface IRatingCore<TNextLevel> {
  total: number;
  byCode: { [index: string]: TNextLevel };
}

export interface IRatingState {
  ratings: {
    loading: boolean;
    fetched: boolean;
    items: IRating[];
    error: boolean | undefined;
  };
  questionaires: {
    loading: boolean;
    fetched: boolean;
    items: IQuestionaire[];
    error: boolean | undefined;
  };
}

export const initialState: IRatingState = {
  ratings: {
    items: [],
    loading: false,
    fetched: false,
    error: undefined,
  },
  questionaires: {
    items: [],
    loading: false,
    fetched: false,
    error: undefined,
  }
};

