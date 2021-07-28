import { RootState } from './../store';
import { MainActions } from './../types/actions';
import {
  TEST,
  SET_FR,
  SET_ACTIVE_NOTE,
  DELETE_TUNING,
  ADD_TUNING,
} from '../types/actions';
import { ThunkAction } from 'redux-thunk';
//   import axios from '../../server/supplemental/axios';

type ThunkActionMain = ThunkAction<void, RootState, unknown, MainActions>;

export const add_tuning = () => <ThunkActionMain>(async (dispatch, getState) => {
    const {
      main: { tunings },
    } = getState();

    const name = `New tuning ${
      tunings.filter((tuning) => /^New tuning/.test(tuning.name)).length + 1
    }`;

    const id = (Math.random() * 10 ** 17).toString();

    const new_tuning = {
      name,
      id,
      data: [
        {
          name: 'E',
          sign: false,
          octave: 2,
          fr: 82.4068892282175,
          active: true,
        },
        {
          name: 'A',
          sign: false,
          octave: 2,
          fr: 110,
          active: false,
        },
        {
          name: 'D',
          sign: false,
          octave: 3,
          fr: 146.83238395870376,
          active: false,
        },
        {
          name: 'G',
          sign: false,
          octave: 3,
          fr: 195.99771799087463,
          active: false,
        },
        {
          name: 'B',
          sign: false,
          octave: 3,
          fr: 246.94165062806204,
          active: false,
        },
        {
          name: 'E',
          sign: false,
          octave: 4,
          fr: 329.62755691286986,
          active: false,
        },
      ],
      active: true,
    };

    dispatch({
      type: ADD_TUNING,
      payload: { new_tuning },
    });
  });

export const delete_tuning = (id: string): MainActions => ({
  type: DELETE_TUNING,
  payload: { id },
});

export const set_fr = (detected_fr: number): MainActions => ({
  type: SET_FR,
  payload: { detected_fr },
});

export const set_active_note = (key: number): MainActions => ({
  type: SET_ACTIVE_NOTE,
  payload: { key },
});

export const test = (value: any) => <ThunkActionMain>(async (dispatch, getState) => {
    try {
      const {
        main: { most_freq_fr },
      } = getState();

      dispatch({
        type: TEST,
        payload: { value: most_freq_fr },
      });

      // const { data } = await axios.get('/api/edit/draft');
    } catch (err) {
      console.error(err);
    }
  });

// ==============================
// ==============================
// ==============================

// ==============================
// ==============================
// ==============================
