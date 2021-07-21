import React from 'react';
// import ml5 from "ml5";
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './layout/home';
import NavBar from './layout/navbar';
import Settings from './layout/settings';
import TuningsList from './layout/tunings-list';
import TuningsPage from './layout/tuning-page';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const App: React.FC<Props> = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/settings' component={Settings} />
          <Route path='/tunings-list' component={TuningsList} />
          <Route path='/tuning-page' component={TuningsPage} />
          <Route path='/' component={Home} />
        </Switch>
        <NavBar />
      </Router>
    </Provider>
  );
};

export default App;
