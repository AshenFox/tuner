import { mainStateInterface } from '@store/types/state';
import languages from '@utilities/lang.json';

const mainInitState: mainStateInterface = {
  tunings: [],
  fr_arr: [120, 120, 120, 120, 120, 120, 120],
  most_freq_fr: 120,
  settings: {
    id: 'main-settings',
    auto_tuning: false,
    language: languages['RU'],
  },
};

export default mainInitState;
