import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers';
import { AppActions } from './types/actions';

const initialState = {};

const middleware = [thunk as ThunkMiddleware<AppState, AppActions>];

/* const store = createStore(rootReducer, initialState, applyMiddleware(...middleware)); */

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

export type AppState = ReturnType<typeof rootReducer>;
