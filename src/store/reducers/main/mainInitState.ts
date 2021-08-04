import { mainStateInterface } from '../../types/state';

const mainInitState: mainStateInterface = {
  tunings: [],
  fr_arr: [120, 120, 120, 120, 120, 120, 120],
  most_freq_fr: 120,
  settings: {
    id: 'main-settings',
    auto_tuning: false,
  },
};

export default mainInitState;
