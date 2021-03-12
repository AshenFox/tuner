import { TEST } from "../../types";
//   import axios from '../../server/supplemental/axios';

// GET_DRAFT
/*   export const get_draft = () => async (dispatch, getState) => {
    try {
      const {
        auth: { user },
      } = getState();
      if (!user) return; // loading
  
      dispatch({
        type: SET_MAIN_LOADING,
        payload: true,
      });
  
      const { data } = await axios.get('/api/edit/draft');
  
      data.cards = arr_to_obj(data.cards);
      data.module = { ...data.module, ...module_fields };
  
      dispatch({ type: GET_MODULE, payload: data });
    } catch (err) {
      window.location.replace(`/home/modules`);
      console.error(err);
    }
  
    dispatch({
      type: SET_MAIN_LOADING,
      payload: false,
    });
  }; */

// ==============================
// ==============================
// ==============================

/* const arr_to_obj = (arr) => {
  return Object.fromEntries(
    arr.map((card) => [
      card._id,
      {
        ...card,
        ...card_fields,
      },
    ])
  );
}; */
