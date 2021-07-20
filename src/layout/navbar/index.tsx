import React from 'react';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const NavBar = (props: Props) => {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='navbar__menu'>
          <div className='navbar__item'>
            <svg className='navbar__icon navbar__icon-tuner'>
              <use href='../svg/sprite.svg#icon__tuning-fork'></use>
            </svg>
            <span className='navbar__title'>Tuner</span>
          </div>
          <div className='navbar__item'>
            <svg className='navbar__icon navbar__icon-settings'>
              <use href='../svg/sprite.svg#icon__settings-2'></use>
            </svg>
            <span className='navbar__title'>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

/* 
<svg>
        <use href='../svg/sprite.svg#icon__settings'></use>
      </svg>

*/
