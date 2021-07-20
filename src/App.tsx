import React from 'react';
// import ml5 from "ml5";
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './layout/home';
import NavBar from './layout/navbar';
import Settings from './layout/settings';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const App: React.FC<Props> = () => {
  return (
    <Provider store={store}>
      {/* <Home /> */}
      <Settings />
      <NavBar />
    </Provider>
  );
};

export default App;
