import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TuningsPage from './components/TuningPage';
import TuningsList from './components/TuningList';
import Main from './components/Main';

interface OwnProps {}

type Props = OwnProps;

const Settings: React.FC<Props> = (props) => {
  return (
    <div className='settings'>
      {/* <Main /> */}
      <Switch>
        {/* <Route path='/settings' component={Main} /> */}
        {/* <Route path='/tunings-list' component={TuningsList} />
          <Route path='/tuning-page' component={TuningsPage} /> */}

        <Route path='/settings/tuning-page' exact component={TuningsPage} />
        <Route path='/settings/tunings-list' exact component={TuningsList} />
        <Route path='/' component={Main} />
      </Switch>
    </div>
  );
};

export default Settings;
