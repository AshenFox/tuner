import { mainStateInterface } from '../../types/state';

const mainInitState: mainStateInterface = {
  tunings: [
    {
      name: 'Standart guitar',
      data: [
        {
          name: 'E',
          sign: false,
          octave: 2,
          fr: 82.4068892282175,
          active: true,
        },
        {
          name: 'A',
          sign: false,
          octave: 2,
          fr: 110,
          active: false,
        },
        {
          name: 'D',
          sign: false,
          octave: 3,
          fr: 146.83238395870376,
          active: false,
        },
        {
          name: 'G',
          sign: false,
          octave: 3,
          fr: 195.99771799087463,
          active: false,
        },
        {
          name: 'B',
          sign: false,
          octave: 3,
          fr: 246.94165062806204,
          active: false,
        },
        {
          name: 'E',
          sign: false,
          octave: 4,
          fr: 329.62755691286986,
          active: false,
        },
      ],
      active: true,
    },
  ],
  test: true,
  fr_arr: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
  most_freq_fr: 120,
};

export default mainInitState;
