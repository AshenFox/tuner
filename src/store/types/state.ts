export type Note = {
  name: string;
  sign: boolean;
  octave: number;
  fr: number;
  active: boolean;
};

export type Tuning = {
  name: string;
  data: Note[];
  active: boolean;
};

export type Tunings = Tuning[];

export interface mainStateInterface {
  test: boolean;
  fr_arr: number[];
  most_freq_fr: number;
  tunings: Tunings;
}
