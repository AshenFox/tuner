import { mainStateInterface } from "./../../types/state";
import { MainActions, TEST, SET_FR } from "./../../types/actions";
import initialState from "./mainInitState";

const MainReducer = (
  state = initialState,
  action: MainActions
): mainStateInterface => {
  switch (action.type) {
    case SET_FR:
      return {
        ...state,
        ...calc_fr(
          state.fr_arr,
          action.payload.detected_fr,
          state.most_freq_fr
        ),
      };

    default:
      return state;
  }
};

export default MainReducer;

const calc_fr = (arr: number[], fr: number, most_freq_fr_old: number) => {
  // Filter our harmonics fr

  const fr_arr = [...arr.filter((el, i) => i !== 0), fr];
  const most_freq_fr_new = get_most_frequent(fr_arr);

  return {
    fr_arr,
    most_freq_fr: most_freq_fr_new,
  };
};

const get_most_frequent = (arr: number[]) => {
  let compare = "";
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
