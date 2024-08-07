import { mainStateInterface, Note } from '@store/types/state';
import {
  MainActions,
  SET_FR,
  SET_ACTIVE_NOTE,
  DELETE_TUNING,
  ADD_TUNING,
  SET_ACTIVE_TUNING,
  EDIT_STRING,
  EDIT_TUNING_NAME,
  ADD_STRING,
  DELETE_STRING,
  TOGGLE_AUTO_TUNING,
  AUTO_SET_ACTIVE_NOTE,
  SYNC_WITH_DB,
  SWITCH_LANGUAGE,
} from '@store/types/actions';
import initialState from './mainInitState';

const MainReducer = (
  state = initialState,
  action: MainActions
): mainStateInterface => {
  switch (action.type) {
    case SWITCH_LANGUAGE:
      return {
        ...state,
        settings: {
          ...state.settings,
          language: action.payload.language,
        },
      };

    case SYNC_WITH_DB:
      return {
        ...state,
        tunings: action.payload.tunings,
        settings: {
          ...state.settings,
          ...action.payload.settings,
        },
      };

    case TOGGLE_AUTO_TUNING:
      return {
        ...state,
        settings: {
          ...state.settings,
          auto_tuning: !state.settings.auto_tuning,
        },
      };

    case DELETE_STRING:
      return {
        ...state,
        tunings: state.tunings.map((tuning) =>
          action.payload.tuning_id === tuning.id
            ? {
                ...tuning,
                data: tuning.data.filter(
                  (string) => action.payload.string_id !== string.id
                ),
              }
            : tuning
        ),
      };

    case ADD_STRING:
      return {
        ...state,
        tunings: state.tunings.map((tuning) =>
          action.payload.id === tuning.id
            ? {
                ...tuning,
                data: [...tuning.data, action.payload.new_string],
              }
            : tuning
        ),
      };

    case EDIT_TUNING_NAME:
      return {
        ...state,
        tunings: state.tunings.map((tuning) =>
          tuning.id === action.payload.id
            ? { ...tuning, name: action.payload.value }
            : tuning
        ),
      };

    case EDIT_STRING:
      return {
        ...state,
        tunings: state.tunings.map((tuning) =>
          action.payload.tuning_id === tuning.id
            ? {
                ...tuning,
                data: tuning.data.map((string) =>
                  action.payload.new_note.id === string.id
                    ? action.payload.new_note
                    : string
                ),
              }
            : tuning
        ),
      };

    case SET_ACTIVE_TUNING:
      return {
        ...state,
        tunings: state.tunings.map((tuning) =>
          action.payload.id === tuning.id
            ? { ...tuning, active: true }
            : { ...tuning, active: false }
        ),
      };

    case ADD_TUNING:
      return {
        ...state,
        tunings: [...state.tunings, action.payload.new_tuning],
      };

    case DELETE_TUNING:
      return {
        ...state,
        tunings: state.tunings.filter(
          (tuning) => tuning.id !== action.payload.id
        ),
      };

    case SET_FR:
      return {
        ...state,
        ...calc_fr(
          state.fr_arr,
          action.payload.detected_fr,
          state.most_freq_fr
        ),
      };

    case AUTO_SET_ACTIVE_NOTE:
      return {
        ...state,
        tunings: state.tunings.map((tuning) =>
          tuning.active
            ? {
                ...tuning,
                data: activate_closest_note(tuning.data, state.most_freq_fr),
              }
            : tuning
        ),
      };

    case SET_ACTIVE_NOTE:
      return {
        ...state,
        tunings: state.tunings.map((tuning) =>
          tuning.active
            ? {
                ...tuning,
                data: tuning.data.map((string) => ({
                  ...string,
                  active: string.id === action.payload.id,
                })),
              }
            : tuning
        ),
      };

    default:
      return state;
  }
};

export default MainReducer;

const calc_fr = (
  fr_arr_prev: number[],
  detected_fr: number,
  most_freq_fr_prev: number
) => {
  const isTooLow = detected_fr <= 5;
  let sensitivity = 5;
  if (most_freq_fr_prev < 100) sensitivity = 15;

  // Filter our harmonics fr
  const harmonic_offset = Math.min(
    Math.abs(detected_fr - most_freq_fr_prev * 2),
    Math.abs(detected_fr - most_freq_fr_prev * 3),
    Math.abs(detected_fr - most_freq_fr_prev * 4)
  );
  const is_harmonic = harmonic_offset <= sensitivity;

  const fr_arr =
    is_harmonic || isTooLow
      ? fr_arr_prev
      : [...fr_arr_prev.filter((_, i) => i !== 0), detected_fr];

  const most_freq_fr =
    is_harmonic || isTooLow
      ? most_freq_fr_prev + (Math.random() < 0.5 ? -0.05 : 0.05)
      : get_most_frequent(fr_arr);

  return {
    fr_arr,
    most_freq_fr: most_freq_fr,
  };
};

const activate_closest_note = (notes: Note[], most_freq_fr: number) => {
  const result = notes.reduce(
    (result, note) => {
      const new_diff = Math.abs(most_freq_fr - note.fr);

      return new_diff < result.diff ? { id: note.id, diff: new_diff } : result;
    },
    { id: '', diff: 10000 }
  );

  return notes.map((string) => ({
    ...string,
    active: string.id === result.id,
  }));
};

const get_most_frequent = (arr: number[]) => {
  let compare = 0;
  let most_freq = 0;
  const key_freq: Record<number, number> = {};

  arr.forEach((val) => {
    const floored = Math.floor(val);

    if (floored in key_freq) {
      // if key already exists
      key_freq[floored]++; // then increment it by 1
    } else {
      key_freq[floored] = 1; // or else create a key with value 1
    }
    if (key_freq[floored] >= compare) {
      // if value of that key is greater
      // than the compare value.
      compare = key_freq[floored]; // than make it a new compare value.
      most_freq = val; // also make that key most frequent.
    }
  });

  return most_freq;
};
