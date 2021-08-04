import { Note } from './../types/state';
import { RootState } from './../store';
import { MainActions } from './../types/actions';
import {
  SET_FR,
  AUTO_SET_ACTIVE_NOTE,
  SET_ACTIVE_NOTE,
  DELETE_TUNING,
  ADD_TUNING,
  SET_ACTIVE_TUNING,
  EDIT_STRING,
  EDIT_TUNING_NAME,
  ERROR,
  ADD_STRING,
  DELETE_STRING,
  TOGGLE_AUTO_TUNING,
  SYNC_WITH_DB,
} from '../types/actions';
import { ThunkAction } from 'redux-thunk';
import { ReactNotificationOptions, store } from 'react-notifications-component';
import db_methods from '../db';
import { v4 as uuidv4 } from 'uuid';

type ThunkActionMain = ThunkAction<void, RootState, unknown, MainActions>;

export const sync_with_db = () => <ThunkActionMain>(async (dispatch) => {
    try {
      const data = await (await db_methods).get_all_data();

      if (!data) throw new Error("DB data hasn't been fetched");

      const { tunings, settings } = data;

      const main_settings = settings.find((item) => item.id === 'main-settings');

      if (!main_settings) throw new Error("Main settings haven't been found");

      dispatch({
        type: SYNC_WITH_DB,
        payload: {
          tunings: tunings.sort((first, second) => first.created - second.created),
          settings: main_settings,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const toggle_auto_tuning = () => <ThunkActionMain>(async (dispatch) => {
    try {
      (await db_methods).toggle_auto_tuning();

      dispatch({
        type: TOGGLE_AUTO_TUNING,
      });
    } catch (error) {
      console.log(error);
    }
  }); // addd set auto tuning

export const delete_string = (tuning_id: string, string_id: string) =>
  <ThunkActionMain>(async (dispatch) => {
    try {
      (await db_methods).delete_string(tuning_id, string_id);

      dispatch({
        type: DELETE_STRING,
        payload: {
          tuning_id,
          string_id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const add_string = (id: string) => <ThunkActionMain>(async (dispatch) => {
    try {
      const new_string = create_note();

      (await db_methods).add_string(id, new_string);

      dispatch({
        type: ADD_STRING,
        payload: {
          id,
          new_string,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const edit_tuning_name = (id: string, value: string) => <ThunkActionMain>(async (
    dispatch
  ) => {
    try {
      if (value.length > 20) {
        store.removeAllNotifications();

        add_custom_notification({
          title: 'Error',
          message: 'Title can be no longer than 20 characters.',
          type: 'danger',
          container: 'top-left',
        });

        dispatch({
          type: ERROR,
        });

        return;
      }

      if (value.length === 0) {
        store.removeAllNotifications();

        add_custom_notification({
          title: 'Warning',
          message: 'Do not leave the title field empty.',
          type: 'warning',
          container: 'top-left',
        });
      }

      (await db_methods).edit_tuning_name(id, value);

      dispatch({
        type: EDIT_TUNING_NAME,
        payload: {
          id,
          value,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const set_octave = (tuning_id: string, data: Note, octave: number) =>
  <ThunkActionMain>(async (dispatch) => {
    try {
      const new_note = create_note(null, octave, data);

      (await db_methods).edit_string(tuning_id, new_note);

      dispatch({
        type: EDIT_STRING,
        payload: {
          tuning_id,
          new_note,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const set_note = (tuning_id: string, data: Note, value: number) =>
  <ThunkActionMain>(async (dispatch) => {
    try {
      const new_note = create_note(value, null, data);

      (await db_methods).edit_string(tuning_id, new_note);

      dispatch({
        type: EDIT_STRING,
        payload: {
          tuning_id,
          new_note,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const set_active_tuning = (id: string): MainActions => ({
  type: SET_ACTIVE_TUNING,
  payload: { id },
});

export const add_tuning = () => <ThunkActionMain>(async (dispatch, getState) => {
    try {
      const {
        main: { tunings },
      } = getState();

      const number =
        tunings.filter((tuning) => /^New tuning/.test(tuning.name)).length + 1;

      const new_tuning = create_tuning(number);

      (await db_methods).add_tuning(new_tuning);

      dispatch({
        type: ADD_TUNING,
        payload: { new_tuning },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const delete_tuning = (id: string) => <ThunkActionMain>(async (dispatch) => {
    try {
      (await db_methods).delete_tuning(id);

      dispatch({
        type: DELETE_TUNING,
        payload: { id },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const set_fr = (detected_fr: number): MainActions => {
  // console.log('fire');
  return {
    type: SET_FR,
    payload: { detected_fr },
  };
};

export const auto_set_active_note = (): MainActions => ({
  type: AUTO_SET_ACTIVE_NOTE,
});

export const set_active_note = (id: string): MainActions => ({
  type: SET_ACTIVE_NOTE,
  payload: { id },
});

// ==============================
// ==============================
// ==============================

const create_note = (
  new_value: number | null = null,
  new_octave: number | null = null,
  data: Note = {
    id: uuidv4(),
    name: 'E',
    value: 5,
    sign: false,
    octave: 2,
    fr: 82.4068892282175,
    active: false,
  }
) => {
  const octave = typeof new_octave === 'number' ? new_octave : data.octave;
  const value = typeof new_value === 'number' ? new_value : data.value;
  const name = typeof new_value === 'number' ? all_notes[new_value - 1].name : data.name;
  const sign = typeof new_value === 'number' ? all_notes[new_value - 1].sign : data.sign;

  const fr = baseFR * 2 ** ((octave * 12 + (value - 1)) / 12);

  return {
    ...data,
    octave,
    value,
    name,
    sign,
    fr,
  };
};

const create_tuning = (nubmer: number) => {
  const name = `New tuning ${nubmer}`;

  const id = uuidv4();

  return {
    name,
    id,
    data: [
      create_note(5, 2),
      create_note(10, 2),
      create_note(3, 3),
      create_note(8, 3),
      create_note(12, 3),
      create_note(5, 4),
    ],
    active: false,
    is_default: false,
    created: Date.now(),
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

const add_custom_notification = (custom_options: ReactNotificationOptions) => {
  store.addNotification({
    ...custom_options,
    insert: 'top',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 4000,
    },
  });
};

// ==============================
// ==============================
// ==============================
