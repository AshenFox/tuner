import { AppState } from './../store';
import { MainActions } from './../types/actions';
import { TEST, SET_FR } from '../types/actions';
import { Dispatch } from 'react';
//   import axios from '../../server/supplemental/axios';

type ThunkMainAC = (dispatch: Dispatch<MainActions>, getState: () => AppState) => void;

export const set_fr = (detected_fr: number): MainActions => ({
  type: SET_FR,
  payload: { detected_fr },
});

export const test = (value: any) => <ThunkMainAC>(async (dispatch, getState) => {
    try {
      const {
        main: { most_freq_fr },
      } = getState();

      dispatch({
        type: TEST,
        payload: { value: most_freq_fr },
      });

      // const { data } = await axios.get('/api/edit/draft');
    } catch (err) {
      console.error(err);
    }
  });

// ==============================
// ==============================
// ==============================
