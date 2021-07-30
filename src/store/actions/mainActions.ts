import { Note } from './../types/state';
import { RootState } from './../store';
import { MainActions } from './../types/actions';
import {
  TEST,
  SET_FR,
  SET_ACTIVE_NOTE,
  DELETE_TUNING,
  ADD_TUNING,
  SET_ACTIVE_TUNING,
  EDIT_STRING,
  EDIT_TUNING_NAME,
  ERROR,
} from '../types/actions';
import { ThunkAction } from 'redux-thunk';
import { store } from 'react-notifications-component';

//   import axios from '../../server/supplemental/axios';

let test_id = '';

type ThunkActionMain = ThunkAction<void, RootState, unknown, MainActions>;

export const edit_tuning_name = (id: string, value: string): MainActions => {
  if (value.length > 20) {
    store.removeAllNotifications();

    console.log(
      store.addNotification({
        title: 'Error',
        message: 'Title can be no longer than 20 characters',
        type: 'danger',
        insert: 'top',
        container: 'top-left',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        /* dismiss: {
          duration: 4000,
        }, */
      })
    );

    return {
      type: ERROR,
    };
  }

  return {
    type: EDIT_TUNING_NAME,
    payload: {
      id,
      value,
    },
  };
};

export const set_octave = (
  tuning_id: string,
  data: Note,
  octave: number
): MainActions => ({
  type: EDIT_STRING,
  payload: {
    tuning_id,
    new_note: create_note(null, octave, data),
  },
});

export const set_note = (tuning_id: string, data: Note, value: number): MainActions => ({
  type: EDIT_STRING,
  payload: {
    tuning_id,
    new_note: create_note(value, null, data),
  },
});

export const set_active_tuning = (id: string): MainActions => ({
  type: SET_ACTIVE_TUNING,
  payload: { id },
});

export const add_tuning = () => <ThunkActionMain>(async (dispatch, getState) => {
    const {
      main: { tunings },
    } = getState();

    const name = `New tuning ${
      tunings.filter((tuning) => /^New tuning/.test(tuning.name)).length + 1
    }`;

    const id = create_id();

    const new_tuning = {
      name,
      id,
      data: [
        {
          id: create_id(),
          name: 'E',
          value: 5,
          sign: false,
          octave: 2,
          fr: 82.4068892282175,
          active: true,
        },
        {
          id: create_id(),
          name: 'A',
          value: 10,
          sign: false,
          octave: 2,
          fr: 110,
          active: false,
        },
        {
          id: create_id(),
          name: 'D',
          value: 3,
          sign: false,
          octave: 3,
          fr: 146.83238395870376,
          active: false,
        },
        {
          id: create_id(),
          name: 'G',
          value: 8,
          sign: false,
          octave: 3,
          fr: 195.99771799087463,
          active: false,
        },
        {
          id: create_id(),
          name: 'B',
          value: 12,
          sign: false,
          octave: 3,
          fr: 246.94165062806204,
          active: false,
        },
        {
          id: create_id(),
          name: 'E',
          value: 5,
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

const create_id = () => (Math.random() * 10 ** 17).toString();

const create_note = (new_value: number | null, new_octave: number | null, data: Note) => {
  const octave = typeof new_octave === 'number' ? new_octave : data.octave;
  const value = typeof new_value === 'number' ? new_value : data.value;
  const name = typeof new_value === 'number' ? all_notes[new_value - 1].name : data.name;
  const sign = typeof new_value === 'number' ? all_notes[new_value - 1].sign : data.sign;

  const fr = baseFR * 2 ** ((octave * 12 + (value - 1)) / 12);

  // console.log(octave * 12 + (value - 1), octave * 12, value - 1);

  return {
    ...data,
    octave,
    value,
    name,
    sign,
    fr,
  };
};

const baseFR = 16.351597831287414;

const all_notes = [
  { sign: false, name: 'C' },
  { sign: true, name: 'C' },
  { sign: false, name: 'D' },
  { sign: true, name: 'D' },
  { sign: false, name: 'E' },
  { sign: false, name: 'F' },
  { sign: true, name: 'F' },
  { sign: false, name: 'G' },
  { sign: true, name: 'G' },
  { sign: false, name: 'A' },
  { sign: true, name: 'A' },
  { sign: false, name: 'B' },
];

// ==============================
// ==============================
// ==============================
