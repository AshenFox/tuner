import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './layout/home';
import NavBar from './layout/navbar';
import Settings from './layout/settings';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';
import DBSyncronizer from './utilities/DBSyncronizer';
import SWRegistrator from './utilities/SWRegistrator';

interface OwnProps {}

type Props = OwnProps;

const App: React.FC<Props> = () => {
  return (
    <>
      <Provider store={store}>
        <ReactNotifications isMobile={true} />
        <DBSyncronizer />
        <SWRegistrator />
        <Router>
          <Switch>
            <Route path='/settings' component={Settings} />
            <Route path='/' component={Home} />
          </Switch>
          <NavBar />
        </Router>
      </Provider>
    </>
  );
};

export default App;
