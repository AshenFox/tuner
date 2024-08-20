import { Note, Tuning, Tunings, Settings, Language } from './state';
// main
export const SET_FR = 'SET_FR';

export const ERROR = 'ERROR';

export const SET_ACTIVE_NOTE = 'SET_ACTIVE_NOTE';
export const AUTO_SET_ACTIVE_NOTE = 'AUTO_SET_ACTIVE_NOTE';

export const DELETE_TUNING = 'DELETE_TUNING';
export const ADD_TUNING = 'ADD_TUNING';

export const SET_ACTIVE_TUNING = 'SET_ACTIVE_TUNING';

export const EDIT_STRING = 'EDIT_STRING';

export const EDIT_TUNING_NAME = 'EDIT_TUNING_NAME';

export const ADD_STRING = 'ADD_STRING';
export const DELETE_STRING = 'DELETE_STRING';

export const TOGGLE_AUTO_TUNING = 'TOGGLE_AUTO_TUNING';

export const SYNC_WITH_DB = 'SYNC_WITH_DB';

export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

export interface SwitchLanguageAction {
  type: typeof SWITCH_LANGUAGE;
  payload: {
    language: Language;
  };
}

export interface SyncWithDBAction {
  type: typeof SYNC_WITH_DB;
  payload: {
    tunings: Tunings;
    settings: Settings;
  };
}

export interface ToggleAutoTuningAction {
  type: typeof TOGGLE_AUTO_TUNING;
}

export interface DeleteStringAction {
  type: typeof DELETE_STRING;
  payload: {
    tuning_id: string;
    string_id: string;
  };
}

export interface AddStringAction {
  type: typeof ADD_STRING;
  payload: {
    id: string;
    new_string: Note;
  };
}

export interface ErrorAction {
  type: typeof ERROR;
}

export interface EditTuningNameAction {
  type: typeof EDIT_TUNING_NAME;
  payload: {
    id: string;
    value: string;
  };
}

export interface EditStringAction {
  type: typeof EDIT_STRING;
  payload: {
    tuning_id: string;
    new_note: Note;
  };
}

export interface SetActiveTuningAction {
  type: typeof SET_ACTIVE_TUNING;
  payload: {
    id: string;
  };
}

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

export interface AutoSetActiveNoteAction {
  type: typeof AUTO_SET_ACTIVE_NOTE;
}

export interface SetActiveNoteAction {
  type: typeof SET_ACTIVE_NOTE;
  payload: {
    id: string;
  };
}

export type MainActions =
  | SetFrAction
  | AutoSetActiveNoteAction
  | SetActiveNoteAction
  | DeleteTuningAction
  | AddTuningAction
  | SetActiveTuningAction
  | EditStringAction
  | EditTuningNameAction
  | ErrorAction
  | AddStringAction
  | DeleteStringAction
  | ToggleAutoTuningAction
  | SyncWithDBAction
  | SwitchLanguageAction; // & ...

export type AppActions = MainActions; // & ...
