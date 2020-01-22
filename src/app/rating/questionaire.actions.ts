import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IRating, IRatingError, IQuestionaire, IQuestionaireError } from './model';

// Flux-standard-action gives us stronger typing of our actions.
export type Payload = IQuestionaire[] | IRatingError;

export interface MetaData {
}

export type QuestionaireAPIAction<T extends Payload = IQuestionaire[]> = FluxStandardAction<
  string,
  T,
  MetaData
>;

@Injectable({
  providedIn: 'root'
})
export class QuestionaireAPIActions {
  static readonly LOAD = '[QUESTIONAIRE]: LOAD';
  static readonly LOAD_STARTED = '[QUESTIONAIRE]: LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = '[QUESTIONAIRE]: LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = '[QUESTIONAIRE]: LOAD_FAILED';

  @dispatch()
  load = (): QuestionaireAPIAction => ({
    type: QuestionaireAPIActions.LOAD,
    meta: {},
  });

  loadStarted = (): QuestionaireAPIAction => ({
    type: QuestionaireAPIActions.LOAD_STARTED,
    meta: {},
  });

  loadSucceeded = (
    payload: IQuestionaire[],
  ): QuestionaireAPIAction<IQuestionaire[]> => ({
    type: QuestionaireAPIActions.LOAD_SUCCEEDED,
    meta: {},
    payload,
  });

  loadFailed = (
    error: IQuestionaireError
  ): QuestionaireAPIAction<IQuestionaireError> => ({
    type: QuestionaireAPIActions.LOAD_FAILED,
    meta: {},
    payload: error,
    error: true,
  });
}