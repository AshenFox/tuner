import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers';
import { AppActions } from './types/actions';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

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
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, null, AppActions>;
// Customized dispatch and selector hooks for the Tuner App
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
