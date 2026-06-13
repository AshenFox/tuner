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
        tunings: state.tunings.map(tuning =>
          action.payload.tuning_id === tuning.id
            ? {
                ...tuning,
                data: tuning.data.filter(
                  string => action.payload.string_id !== string.id
                ),
              }
            : tuning
        ),
      };

    case ADD_STRING:
      return {
        ...state,
        tunings: state.tunings.map(tuning =>
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
        tunings: state.tunings.map(tuning =>
          tuning.id === action.payload.id
            ? { ...tuning, name: action.payload.value }
            : tuning
        ),
      };

    case EDIT_STRING:
      return {
        ...state,
        tunings: state.tunings.map(tuning =>
          action.payload.tuning_id === tuning.id
            ? {
                ...tuning,
                data: tuning.data.map(string =>
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
        active_tuning_id:
          state.tunings.find(({ id }) => action.payload.id === id)?.id ?? null,
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
          tuning => tuning.id !== action.payload.id
        ),
      };

    case SET_FR:
      return {
        ...state,
        ...calc_fr(
          state.fr_arr,
          action.payload.detected_fr,
          state.most_freq_fr,
          state.reject_count
        ),
      };

    case AUTO_SET_ACTIVE_NOTE:
      return {
        ...state,
        active_note_id: find_closest_note(
          state.tunings.find(({ id }) => id === state.active_tuning_id)?.data ??
            [],
          state.most_freq_fr
        ),
      };

    case SET_ACTIVE_NOTE:
      return {
        ...state,
        active_note_id: action.payload.id,
      };

    default:
      return state;
  }
};

export default MainReducer;

// Pitch detector is unreliable below this threshold; readings are ignored
const PITCH_FLOOR_HZ = 5;

// After this many consecutive "harmonic" rejections we assume the player has
// genuinely changed notes (not a transient harmonic blip) and force-accept the
// reading. Roughly matches fr_arr length so a real note change wins quickly.
const FLUSH_AFTER = 7;

const calc_fr = (
  fr_arr_prev: number[],
  detected_fr: number,
  most_freq_fr_prev: number,
  reject_count_prev: number
) => {
  const isTooLow = detected_fr <= PITCH_FLOOR_HZ;

  // ~3% tolerance ≈ ±50 cents, self-calibrating across all frequencies.
  // Floor keeps the filter meaningful if most_freq_fr ever collapses toward 0.
  const sensitivity = Math.max(most_freq_fr_prev * 0.03, 1);

  // Filter harmonic multiples (2×–5×) and sub-harmonics (÷2, ÷3)
  const harmonic_offset = Math.min(
    Math.abs(detected_fr - most_freq_fr_prev * 2),
    Math.abs(detected_fr - most_freq_fr_prev * 3),
    Math.abs(detected_fr - most_freq_fr_prev * 4),
    Math.abs(detected_fr - most_freq_fr_prev * 5)
  );
  const subharmonic_offset = Math.min(
    Math.abs(detected_fr - most_freq_fr_prev / 2),
    Math.abs(detected_fr - most_freq_fr_prev / 3)
  );
  const looks_harmonic =
    harmonic_offset <= sensitivity || subharmonic_offset <= sensitivity;

  // Escape hatch: a sustained run of "harmonic" readings is almost certainly a
  // real note change near prev/2 or prev/3, so let it through instead of
  // deadlocking on the old pitch forever.
  const force_flush = reject_count_prev >= FLUSH_AFTER;
  const reject = (looks_harmonic && !force_flush) || isTooLow;

  const fr_arr = reject
    ? fr_arr_prev
    : [...fr_arr_prev.filter((_, i) => i !== 0), detected_fr];

  const most_freq_fr = reject ? most_freq_fr_prev : get_most_frequent(fr_arr);

  // Only count the harmonic-rejection streak; silence (too low) resets it.
  const reject_count =
    looks_harmonic && !force_flush && !isTooLow ? reject_count_prev + 1 : 0;

  return {
    fr_arr,
    most_freq_fr,
    reject_count,
  };
};

const find_closest_note = (notes: Note[], most_freq_fr: number) => {
  const result = notes.reduce<{ id: null | string; diff: number }>(
    (result, note) => {
      const new_diff = Math.abs(most_freq_fr - note.fr);

      return new_diff < result.diff ? { id: note.id, diff: new_diff } : result;
    },
    { id: null, diff: 10000 }
  );

  return result.id;
};

const get_most_frequent = (arr: number[]) => {
  // Bin size scales with frequency (~1% of value, min 0.5 Hz) so that
  // low-frequency readings aren't coarsely bucketed into 1 Hz slots.
  const bins: Record<number, { count: number; sum: number }> = {};
  let bestKey: number | null = null;

  arr.forEach(val => {
    const binSize = Math.max(val * 0.01, 0.5);
    const key = Math.round(val / binSize);

    if (!(key in bins)) bins[key] = { count: 0, sum: 0 };

    const bin = bins[key];
    bin.count++;
    bin.sum += val;

    // Strict `>` keeps the first bin to reach the max as the winner, so ties
    // resolve deterministically instead of favouring later readings.
    if (bestKey === null || bin.count > bins[bestKey].count) bestKey = key;
  });

  // Return the average of the winning bin for a stable, representative value.
  return bestKey === null ? 0 : bins[bestKey].sum / bins[bestKey].count;
};
