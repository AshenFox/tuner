import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/store';
import { toggle_auto_tuning } from '../../../store/actions/mainActions';
import { Link } from 'react-router-dom';

interface OwnProps {}

type Props = OwnProps;

const Main: React.FC<Props> = props => {
  const {
    settings: { auto_tuning, language },
  } = useAppSelector(state => state.main);

  const dispatch = useAppDispatch();

  const onToggleClick = (e: React.MouseEvent) => dispatch(toggle_auto_tuning());

  console.log({ language });

  return (
    <div className='container'>
      <h1 className='settings__header'>{language.settings.main.header}</h1>
      <div className='settings__menu'>
        <Link to='/settings/tunings-list'>
          <div className='settings__menu-item settings__menu-item--clickable'>
            <span>{language.settings.main.options.tunings_list}</span>
          </div>
        </Link>

        <div className='settings__menu-item'>
          <span>{language.settings.main.options.auto_tuning}</span>
          <div className='settings__menu-toggle'>
            <input
              className='toggle-checkbox'
              type='checkbox'
              id='toggle'
              checked={auto_tuning}
              readOnly
            />
            <label
              className='toggle-frame'
              htmlFor='toggle'
              /* onClick={clickAllSave} */
              onClick={onToggleClick}
            ></label>
            <div className='toggle-switch'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
