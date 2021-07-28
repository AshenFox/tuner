import React from 'react';
// import ml5 from "ml5";
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './layout/home';
import NavBar from './layout/navbar';
import Settings from './layout/settings';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

interface OwnProps {}

type Props = OwnProps;

const App: React.FC<Props> = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/settings' component={Settings} />
          <Route path='/' component={Home} />
        </Switch>
        <NavBar />
      </Router>
    </Provider>
  );
};

export default App;
