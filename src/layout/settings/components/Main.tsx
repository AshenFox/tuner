import { KeyboardEventHandler, memo, MouseEventHandler } from 'react';

import { useActions, useAppSelector } from '@store/hooks';
import { Link } from 'react-router-dom';

const Main = () => {
  const auto_tuning = useAppSelector(s => s.main.settings.auto_tuning);
  const language = useAppSelector(s => s.main.settings.language);

  const { toggle_auto_tuning } = useActions();

  const onToggleClick: MouseEventHandler = () => toggle_auto_tuning();
  const onToggleKeyDown: KeyboardEventHandler = () => toggle_auto_tuning();

  return (
    <div className="container">
      <h1 className="settings__header">{language.settings.main.header}</h1>
      <div className="settings__menu">
        <Link to="/settings/tunings-list">
          <div className="settings__menu-item settings__menu-item--clickable">
            <span>{language.settings.main.options.tunings_list}</span>
          </div>
        </Link>

        <div className="settings__menu-item">
          <span>{language.settings.main.options.auto_tuning}</span>
          <div className="settings__menu-toggle">
            <label
              className="toggle-frame"
              htmlFor="toggle"
              onClick={onToggleClick}
              onKeyDown={onToggleKeyDown}
              role="button"
            >
              <input
                className="toggle-checkbox"
                type="checkbox"
                id="toggle"
                checked={auto_tuning}
                readOnly
              />
            </label>
            <div className="toggle-switch" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Main);
