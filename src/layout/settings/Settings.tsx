import { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import TuningsPage from './components/TuningsPage';
import TuningsList from './components/TuningsList';
import Main from './components/Main';
import LanguageSelect from './components/LanguageSelect';

const Settings = () => {
  return (
    <div className="page settings">
      <LanguageSelect />
      <Switch>
        <Route path="/settings/tuning-page/:id" exact component={TuningsPage} />
        <Route path="/settings/tunings-list" exact component={TuningsList} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default memo(Settings);
