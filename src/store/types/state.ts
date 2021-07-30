export type Note = {
  id: string;
  name: string;
  value: number;
  sign: boolean;
  octave: number;
  fr: number;
  active: boolean;
};

export type Tuning = {
  id: string;
  name: string;
  data: Note[];
  active: boolean;
};

export type Tunings = Tuning[];

export interface mainStateInterface {
  fr_arr: number[];
  most_freq_fr: number;
  tunings: Tunings;
  auto_tuning: boolean;
}
