import { openDB, DBSchema } from 'idb';
import { Tuning, Settings, Note } from '../types/state';

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
  const db = await openDB<MyDB>('db', 1, {
    upgrade(db) {
      db.createObjectStore('tunings', { keyPath: 'id' });
      db.createObjectStore('settings', { keyPath: 'id' });
    },
  });

  const { length } = await db.getAllKeys('tunings');

  if (!length) {
    await db.put('tunings', dafault_tunings[0]);
    await db.put('tunings', dafault_tunings[1]);

    await db.put('settings', { id: 'main-settings', auto_tuning: true });
  }

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
  };
};

// DB_methods

const dafault_tunings = [
  {
    name: 'Standart guitar',
    id: '76d9ccac-d184-413d-a3ba-12f183e4e9f0',
    data: [
      {
        id: '1a15fdcb-e911-45f5-b80e-7a923c15e64b',
        name: 'E',
        value: 5,
        sign: false,
        octave: 2,
        fr: 82.4068892282175,
        active: true,
      },
      {
        id: 'f9c17aec-10b5-467f-a321-f7ed045ff7d6',
        name: 'A',
        value: 10,
        sign: false,
        octave: 2,
        fr: 110,
        active: false,
      },
      {
        id: '6a0244bf-6c2a-4d32-b0cf-85aa0fbf11d2',
        name: 'D',
        value: 3,
        sign: false,
        octave: 3,
        fr: 146.83238395870376,
        active: false,
      },
      {
        id: '0c6d2a99-1128-4fae-975f-7654220cc27c',
        name: 'G',
        value: 8,
        sign: false,
        octave: 3,
        fr: 195.99771799087463,
        active: false,
      },
      {
        id: 'c51cf435-f6c6-4fe5-af51-e113994b1eb2',
        name: 'B',
        value: 12,
        sign: false,
        octave: 3,
        fr: 246.94165062806204,
        active: false,
      },
      {
        id: '4e1cc747-16f6-4db9-bc50-a18765d0c9c2',
        name: 'E',
        value: 5,
        sign: false,
        octave: 4,
        fr: 329.62755691286986,
        active: false,
      },
    ],
    active: true,

    is_default: true,
    created: 1628083499901,
  },
  {
    name: 'Drop D',
    id: '4546131b-da0b-4ce2-9d9c-816064c357e1',
    data: [
      {
        id: '5b26c4e9-fa77-40c1-b597-3e8bdce730ad',
        name: 'D',
        value: 3,
        sign: false,
        octave: 2,
        fr: 73.41619,
        active: true,
      },
      {
        id: '71d6c4f8-5eb0-4005-a296-e70186d3ac1e',
        name: 'A',
        value: 10,
        sign: false,
        octave: 2,
        fr: 110,
        active: false,
      },
      {
        id: '6088df93-10e3-4776-8432-e90c74ad00c1',
        name: 'D',
        value: 3,
        sign: false,
        octave: 3,
        fr: 146.83238395870376,
        active: false,
      },
      {
        id: '26ea5756-4274-44de-98fd-2850418f611e',
        name: 'G',
        value: 8,
        sign: false,
        octave: 3,
        fr: 195.99771799087463,
        active: false,
      },
      {
        id: 'd4a041e1-e9a2-4ceb-b668-e9363e0881e2',
        name: 'B',
        value: 12,
        sign: false,
        octave: 3,
        fr: 246.94165062806204,
        active: false,
      },
      {
        id: 'ed015cb-af1f-414e-9f6b-96d849b6e54c',
        name: 'E',
        value: 5,
        sign: false,
        octave: 4,
        fr: 329.62755691286986,
        active: false,
      },
    ],
    active: false,
    is_default: true,
    created: 1628083569741,
  },
];

const db_methods = set_up_db();

export default db_methods;
