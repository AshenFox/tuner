import React from 'react';
import { Link } from 'react-router-dom';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Settings = (props: Props) => {
  return (
    <div className='settings'>
      <div className='container'>
        <h1 className='settings__header'>Settings</h1>
        <div className='settings__menu'>
          <Link to='/tunings-list'>
            <div className='settings__item settings__item--clickable'>
              <span>Tunings list</span>
            </div>
          </Link>

          <div className='settings__item'>
            <span>Auto tuning</span>
            <div className='settings__toggle'>
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
    </div>
  );
};

export default Settings;
