import { Note } from '@store/types/state';
import { ThunkActionApp } from '@store/store';
import { MainActions } from '@store/types/actions';
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
  SWITCH_LANGUAGE,
} from '@store/types/actions';
import { Store } from 'react-notifications-component';
import db_methods from '@store/db';
import { v4 as uuidv4 } from 'uuid';
import languages from '@utilities/lang.json';
import {
  create_note,
  create_tuning,
  add_custom_notification,
} from '@store/utilities/helperFunctions';

export const switch_language = (value: 'RU' | 'ENG') =>
  <ThunkActionApp>(async dispatch => {
    try {
      (await db_methods).switch_language(value);

      dispatch({
        type: SWITCH_LANGUAGE,
        payload: {
          language: languages[value],
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const sync_with_db = () => <ThunkActionApp>(async dispatch => {
    try {
      const data = await (await db_methods).get_all_data();

      if (!data) throw new Error("DB data hasn't been fetched");

      const { tunings, settings } = data;

      const main_settings = settings.find(item => item.id === 'main-settings');

      if (!main_settings) throw new Error("Main settings haven't been found");

      dispatch({
        type: SYNC_WITH_DB,
        payload: {
          tunings: tunings.sort(
            (first, second) => first.created - second.created
          ),
          settings: main_settings,
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const toggle_auto_tuning = () => <ThunkActionApp>(async dispatch => {
    try {
      (await db_methods).toggle_auto_tuning();

      dispatch({
        type: TOGGLE_AUTO_TUNING,
      });
    } catch (error) {
      console.log(error);
    }
  }); // add set auto tuning

export const delete_string = (tuning_id: string, string_id: string) =>
  <ThunkActionApp>(async dispatch => {
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

export const add_string = (id: string) => <ThunkActionApp>(async dispatch => {
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

let notif_id: string = '';

export const edit_tuning_name = (id: string, value: string) =>
  <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        main: {
          settings: { language },
        },
      } = getState();

      if (value.length > 20) {
        Store.removeNotification(notif_id);

        notif_id = uuidv4();

        add_custom_notification({
          title: language.notifications.error.name,
          message: language.notifications.error.message,
          type: 'danger',
          container: 'top-left',
          id: notif_id,
        });

        dispatch({
          type: ERROR,
        });

        return;
      }

      if (value.length === 0) {
        Store.removeNotification(notif_id);

        notif_id = uuidv4();

        add_custom_notification({
          title: language.notifications.warning.name,
          message: language.notifications.warning.message,
          type: 'warning',
          container: 'top-left',
          id: notif_id,
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
  <ThunkActionApp>(async dispatch => {
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
  <ThunkActionApp>(async dispatch => {
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

export const add_tuning = () => <ThunkActionApp>(async (dispatch, getState) => {
    try {
      const {
        main: {
          tunings,
          settings: { language },
        },
      } = getState();

      const number =
        tunings.filter(tuning =>
          new RegExp(`^${language.tunings.new}`).test(tuning.name)
        ).length + 1;

      const new_tuning = create_tuning(number, language.tunings.new);

      (await db_methods).add_tuning(new_tuning);

      dispatch({
        type: ADD_TUNING,
        payload: { new_tuning },
      });
    } catch (error) {
      console.log(error);
    }
  });

export const delete_tuning = (id: string) =>
  <ThunkActionApp>(async dispatch => {
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
