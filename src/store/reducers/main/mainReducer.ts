import { mainStateInterface } from './../../types/state';
import {
  MainActions,
  TEST,
  SET_FR,
  SET_ACTIVE_NOTE,
  DELETE_TUNING,
  ADD_TUNING,
  SET_ACTIVE_TUNING,
  EDIT_STRING,
  EDIT_TUNING_NAME,
} from './../../types/actions';
import initialState from './mainInitState';

const MainReducer = (state = initialState, action: MainActions): mainStateInterface => {
  switch (action.type) {
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
        tunings: state.tunings.filter((tuning) => tuning.id !== action.payload.id),
      };

    case SET_FR:
      return {
        ...state,
        ...calc_fr(state.fr_arr, action.payload.detected_fr, state.most_freq_fr),
      };

    case SET_ACTIVE_NOTE:
      return {
        ...state,
        tunings: state.tunings.map((tuning) =>
          tuning.active
            ? {
                ...tuning,
                data: tuning.data.map((string, i) => ({
                  ...string,
                  active: i === action.payload.key,
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
  let sensitivity = 5;
  if (most_freq_fr_prev < 100) sensitivity = 15;

  // Filter our harmonics fr
  let harmonic_offset = Math.min(
    Math.abs(detected_fr - most_freq_fr_prev * 2),
    Math.abs(detected_fr - most_freq_fr_prev * 3),
    Math.abs(detected_fr - most_freq_fr_prev * 4)
  );
  const is_harmonic = harmonic_offset <= sensitivity;

  const fr_arr = is_harmonic
    ? fr_arr_prev
    : [...fr_arr_prev.filter((el, i) => i !== 0), detected_fr];
  const most_freq_fr = is_harmonic
    ? most_freq_fr_prev + (Math.random() < 0.5 ? -0.05 : 0.05)
    : get_most_frequent(fr_arr);

  return {
    fr_arr,
    most_freq_fr: most_freq_fr,
  };
};

const get_most_frequent = (arr: number[]) => {
  let compare = '';
  let most_freq = 0;

  let acc = arr.reduce((acc: any, val) => {
    const floored = Math.floor(val);

    if (floored in acc) {
      // if key already exists
      acc[floored]++; // then increment it by 1
    } else {
      acc[floored] = 1; // or else create a key with value 1
    }
    if (acc[floored] >= compare) {
      // if value of that key is greater
      // than the compare value.
      compare = acc[floored]; // than make it a new compare value.
      most_freq = val; // also make that key most frequent.
    }

    return acc;
  }, {});

  // console.log(acc);

  return most_freq;
};
