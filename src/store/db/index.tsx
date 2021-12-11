import { openDB, DBSchema } from 'idb';
import { Tuning, Settings, Note, Tunings } from '../types/state';
import languages from '../../utilities/lang.json';
import { create_note } from '../utilities/helperFunctions';

interface MyDB extends DBSchema {
  tunings: {
    key: string;
    value: Tuning;
  };
  settings: {
    key: string;
    value: Settings;
  };
}

const set_up_db = async () => {
  // Setting up the db
  const db = await openDB<MyDB>('db', 4, {
    upgrade(db, oldVersion, newVersion, tx) {
      console.log('fire', oldVersion, newVersion);

      if (oldVersion === 0) {
        db.createObjectStore('tunings', { keyPath: 'id' });
        db.createObjectStore('settings', { keyPath: 'id' });
      }

      const tunings_store = tx.objectStore('tunings');
      const settings_store = tx.objectStore('settings');

      default_tunings.map((tuning) => tunings_store.put(tuning));

      settings_store.put({
        id: 'main-settings',
        auto_tuning: true,
        language: languages['ENG'],
      });
    },
  });

  // ==========
  // The db edit Methods
  const get_all_data = async () => {
    try {
      const tunings = await db.getAll('tunings');
      const settings = await db.getAll('settings');

      return {
        tunings,
        settings,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const add_tuning = async (new_tuning: Tuning) => {
    try {
      return db.put('tunings', new_tuning);
    } catch (error) {
      console.log(error);
    }
  };

  const edit_tuning_name = async (id: string, value: string) => {
    try {
      const tuning = await db.get('tunings', id);

      if (tuning) db.put('tunings', { ...tuning, name: value });
    } catch (error) {
      console.log(error);
    }
  };

  const delete_tuning = async (id: string) => {
    try {
      return db.delete('tunings', id);
    } catch (error) {
      console.log(error);
    }
  };

  const add_string = async (id: string, new_string: Note) => {
    try {
      const tuning = await db.get('tunings', id);

      if (tuning)
        return db.put('tunings', { ...tuning, data: [...tuning.data, new_string] });
    } catch (error) {
      console.log(error);
    }
  };

  const edit_string = async (id: string, new_note: Note) => {
    try {
      const tuning = await db.get('tunings', id);

      if (tuning)
        return db.put('tunings', {
          ...tuning,
          data: tuning.data.map((string) =>
            new_note.id === string.id ? new_note : string
          ),
        });
    } catch (error) {
      console.log(error);
    }
  };

  const delete_string = async (tuning_id: string, string_id: string) => {
    try {
      const tuning = await db.get('tunings', tuning_id);

      if (tuning)
        return db.put('tunings', {
          ...tuning,
          data: tuning.data.filter((string) => string_id !== string.id),
        });
    } catch (error) {
      console.log(error);
    }
  };

  const toggle_auto_tuning = async () => {
    try {
      const settings = await db.get('settings', 'main-settings');

      if (settings) {
        return db.put('settings', { ...settings, auto_tuning: !settings.auto_tuning });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const switch_language = async (value: 'RU' | 'ENG') => {
    try {
      const settings = await db.get('settings', 'main-settings');

      if (settings) {
        return db.put('settings', { ...settings, language: languages[value] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========

  return {
    add_tuning,
    edit_tuning_name,
    delete_tuning,
    add_string,
    edit_string,
    delete_string,
    toggle_auto_tuning,
    get_all_data,
    switch_language,
  };
};

// DB_methods

const default_tunings: Tunings = [
  {
    name: 'guitar_standart',
    id: '76d9ccac-d184-413d-a3ba-12f183e4e9f0',
    data: [
      create_note(5, 2),
      create_note(10, 2),
      create_note(3, 3),
      create_note(8, 3),
      create_note(12, 3),
      create_note(5, 4),
    ],
    active: true,
    is_default: true,
    created: 1628083499901,
    default_key: 'guitar_standart',
  },
  {
    name: 'guitar_drop_d',
    id: '4546131b-da0b-4ce2-9d9c-816064c357e1',
    data: [
      create_note(3, 2),
      create_note(10, 2),
      create_note(3, 3),
      create_note(8, 3),
      create_note(12, 3),
      create_note(5, 4),
    ],
    active: false,
    is_default: true,
    created: 1628083569741,
    default_key: 'guitar_drop_d',
  },
  {
    name: 'guitar_b1',
    id: '1ee86f62-68fe-49ff-a968-2c9ea1c0a2fa',
    data: [
      create_note(4, 2),
      create_note(9, 2),
      create_note(2, 3),
      create_note(7, 3),
      create_note(11, 3),
      create_note(4, 4),
    ],
    active: false,
    is_default: true,
    created: 1628083569742,
    default_key: 'guitar_b1',
  },
  {
    name: 'guitar_b2',
    id: 'f05c6e47-ea9b-404b-af7c-6b4e26daf5f7',
    data: [
      create_note(3, 2),
      create_note(8, 2),
      create_note(1, 3),
      create_note(6, 3),
      create_note(10, 3),
      create_note(3, 4),
    ],
    active: false,
    is_default: true,
    created: 1628083569743,
    default_key: 'guitar_b2',
  },
  {
    name: 'ukulele',
    id: 'aa5520af-cdc9-4977-8bdb-478be826fe2d',
    data: [create_note(8, 4), create_note(1, 4), create_note(5, 4), create_note(10, 4)],
    active: false,
    is_default: true,
    created: 1628083569744,
    default_key: 'ukulele',
  },
];

const db_methods = set_up_db();

export default db_methods;
