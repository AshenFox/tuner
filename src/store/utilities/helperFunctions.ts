import { Note, Tuning } from '@store/types/state';
import { iNotification, Store } from 'react-notifications-component';
import { v4 as uuidv4 } from 'uuid';

// react-notifications-component
// react-select

// ==============================
// ==============================
// ==============================

export const create_note = (
  new_value: number | null = null,
  new_octave: number | null = null,
  data: Note = {
    id: uuidv4(),
    name: 'E',
    value: 5,
    sign: false,
    octave: 2,
    fr: 82.4068892282175,
  }
) => {
  const octave = typeof new_octave === 'number' ? new_octave : data.octave;
  const value = typeof new_value === 'number' ? new_value : data.value;
  const name =
    typeof new_value === 'number' ? all_notes[new_value - 1].name : data.name;
  const sign =
    typeof new_value === 'number' ? all_notes[new_value - 1].sign : data.sign;

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

export const create_tuning = (number: number, title: string): Tuning => {
  const name = `${title} ${number}`;

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
    is_default: false,
    default_key: 'new_tuning',
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

export const add_custom_notification = (custom_options: iNotification) => {
  Store.addNotification({
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
