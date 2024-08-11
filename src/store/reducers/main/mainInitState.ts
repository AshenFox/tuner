import { mainStateInterface } from '@store/types/state';
import languages from '@utilities/lang.json';

const mainInitState: mainStateInterface = {
  tunings: [],
  active_note_id: null,
  active_tuning_id: null, // '76d9ccac-d184-413d-a3ba-12f183e4e9f0'
  fr_arr: [120, 120, 120, 120, 120, 120, 120],
  most_freq_fr: 120,
  settings: {
    id: 'main-settings',
    auto_tuning: false,
    language: languages.RU,
  },
};

export default mainInitState;
