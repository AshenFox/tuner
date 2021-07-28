import React from 'react';
import { Link } from 'react-router-dom';

interface OwnProps {}

type Props = OwnProps;

const Main: React.FC<Props> = (props) => {
  return (
    <div className='container'>
      <h1 className='settings__header'>Settings</h1>
      <div className='settings__menu'>
        <Link to='/settings/tunings-list'>
          <div className='settings__menu-item settings__menu-item--clickable'>
            <span>Tunings list</span>
          </div>
        </Link>

        <div className='settings__menu-item'>
          <span>Auto tuning</span>
          <div className='settings__menu-toggle'>
            <input
              className='toggle-checkbox'
              type='checkbox'
              id='toggle'
              /* checked={active} */
              /* readOnly */
            />
            <label
              className='toggle-frame'
              htmlFor='toggle'
              /* onClick={clickAllSave} */
            ></label>
            <div className='toggle-switch'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
