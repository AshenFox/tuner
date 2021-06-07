type Note = {
  key: string;
  name: string;
  sign: boolean;
  octave: number;
  fr: number;
  active: number;
};

type Tunning = {
  key: string;
  name: string;
  data: Note[];
  active: boolean;
};

export interface mainStateInterface {
  test: boolean;
  fr_arr: number[];
  most_freq_fr: number;
  tunnings: Tunning[];
}
