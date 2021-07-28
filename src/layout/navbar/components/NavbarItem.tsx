import React from 'react';
import { NavLink } from 'react-router-dom';

interface OwnProps {
  to: string;
  icon: string;
  children: React.ReactNode;
}

type Props = OwnProps;

const NavBarItem: React.FC<Props> = ({ to, icon, children }) => {
  return (
    <NavLink to={to} exact activeClassName='selected'>
      <div className='navbar__item'>
        <svg className='navbar__icon navbar__icon-tuner'>
          <use href={`../svg/sprite.svg#icon__${icon}`}></use>
        </svg>
        <span className='navbar__title'>{children}</span>
      </div>
    </NavLink>
  );
};

export default NavBarItem;
