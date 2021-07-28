import { Tuning } from './state';
// main
export const TEST = 'TEST';
export const SET_FR = 'SET_FR';
// new types
export const SET_ACTIVE_NOTE = 'SET_ACTIVE_NOTE';

export const DELETE_TUNING = 'DELETE_TUNING';
export const ADD_TUNING = 'ADD_TUNING';

export interface AddTuningAction {
  type: typeof ADD_TUNING;
  payload: {
    new_tuning: Tuning;
  };
}

export interface DeleteTuningAction {
  type: typeof DELETE_TUNING;
  payload: {
    id: string;
  };
}

export interface SetFrAction {
  type: typeof SET_FR;
  payload: {
    detected_fr: number;
  };
}

export interface SetActiveNoteAction {
  type: typeof SET_ACTIVE_NOTE;
  payload: {
    key: number;
  };
}

export interface Test {
  type: typeof TEST;
  payload: { value: any };
}

export type MainActions =
  | SetFrAction
  | SetActiveNoteAction
  | Test
  | DeleteTuningAction
  | AddTuningAction; // & ...

export type AppActions = MainActions; // & ...
