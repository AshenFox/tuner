import { combineReducers } from 'redux';
import mainReducer from './main/mainReducer';

export default combineReducers({
  main: mainReducer,
});
