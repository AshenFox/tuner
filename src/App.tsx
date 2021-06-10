import React from 'react';
// import ml5 from "ml5";
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './layout/home';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const App: React.FC<Props> = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
