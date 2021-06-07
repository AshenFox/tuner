// main
export const TEST = "TEST";
export const SET_FR = "SET_FR";
// new types
export const SET_NOTE = "SET_NOTE";

export interface SetFrAction {
  type: typeof SET_FR;
  payload: {
    detected_fr: number;
  };
}

export interface Test {
  type: typeof TEST;
  payload: { value: any };
}

export type MainActions = SetFrAction | Test; // & ...

export type AppActions = MainActions; // & ...
