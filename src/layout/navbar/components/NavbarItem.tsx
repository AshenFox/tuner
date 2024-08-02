import React, { memo, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type NavBarItemProps = {
  to: string;
  icon: string;
  children: ReactNode;
};

const NavBarItem = ({ to, icon, children }: NavBarItemProps) => {
  return (
    <NavLink to={to} exact activeClassName="selected" className="navbar__item">
      <svg className={`navbar__icon navbar__icon-${icon}`}>
        <use href={`${window.location.origin}/svg/sprite.svg#icon__${icon}`} />
      </svg>
      <span className="navbar__title">{children}</span>
    </NavLink>
  );
};

export default memo(NavBarItem);
