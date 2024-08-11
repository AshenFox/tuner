import languages from '@utilities/lang.json';

export type Note = {
  id: string;
  name: string;
  value: number;
  sign: boolean;
  octave: number;
  fr: number;
};

export type Tuning = {
  id: string;
  name: string;
  data: Note[];
  // active: boolean;
  created: number;
  is_default: boolean;
  default_key:
    | 'guitar_standard'
    | 'guitar_drop_d'
    | 'guitar_b1'
    | 'guitar_b2'
    | 'ukulele'
    | 'new_tuning';
};

export type Language = (typeof languages)['ENG'];

export type Settings = {
  id: string;
  auto_tuning: boolean;
  language: Language;
};

export type Tunings = Tuning[];

export interface mainStateInterface {
  fr_arr: number[];
  most_freq_fr: number;
  tunings: Tunings;
  active_note_id: string | null;
  active_tuning_id: string | null;
  settings: Settings;
}
