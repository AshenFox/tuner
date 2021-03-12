import {} from "../../actions/types";
import initialState from "./mainInitState";

const MainReducer = (state = initialState, action: any) => {
  const { payload, type } = action;

  switch (type) {
    /* case SET_IS_SERVER:
      return {
        ...state,
        is_server: payload.value,
      }; */

    default:
      return state;
  }
};

export default MainReducer;
