// main
export const TEST = 'TEST';
export const SET_FR = 'SET_FR';
// new types
export const SET_ACTIVE_NOTE = 'SET_ACTIVE_NOTE';

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

export type MainActions = SetFrAction | SetActiveNoteAction | Test; // & ...

export type AppActions = MainActions; // & ...
