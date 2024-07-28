import React, { memo } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './layout/home';
import NavBar from './layout/navbar';
import Settings from './layout/settings';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import DBSynchronizer from './utilities/DBSyncronizer';
import SWRegistrator from './utilities/SWRegistrator';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ReactNotifications isMobile={true} />
        <DBSynchronizer />
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

export default memo(App);
