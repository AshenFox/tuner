import React from 'react';

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
          <div className='settings__item settings__item--clickable'>
            <span>Tunings list</span>
          </div>
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
                className='toggle-switch'
                htmlFor='toggle'
                /* onClick={clickAllSave} */
              ></label>
              <div className='toggle-frame'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
