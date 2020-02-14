import { createAction, props } from '@ngrx/store';

import { IRating, IRatingError, IQuestionaire as IQuestionnaire, IQuestionaireError as IQuestionnaireError } from './model';

export const LOAD = '[QUESTIONAIRE]: LOAD';
export const LOAD_STARTED = '[QUESTIONAIRE]: LOAD_STARTED';
export const LOAD_SUCCEEDED = '[QUESTIONAIRE]: LOAD_SUCCEEDED';
export const LOAD_FAILED = '[QUESTIONAIRE]: LOAD_FAILED';

export const loadQuestionnaires = createAction(LOAD);
export const loadQuestionnairesFailed = createAction(LOAD_FAILED, props<{ payload: IQuestionnaireError, error: true }>());
export const loadQuestionnairesSucceeded = createAction(LOAD_SUCCEEDED, props<{ payload: IQuestionnaire[] }>());
