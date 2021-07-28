import React, { useState, useEffect, useRef } from 'react';
import Hamburger from './components/Hamburger';
import NavBarItem from './components/NavbarItem';

interface OwnProps {}

type Props = OwnProps;

const NavBar: React.FC<Props> = (props) => {
  const [isActive, setIsActive] = useState(false);

  const hamburgerClick = (e: React.MouseEvent) => setIsActive(!isActive);
  const closeNavbar = useRef(() => setIsActive(false));

  useEffect(() => {
    isActive
      ? document.addEventListener('click', closeNavbar.current)
      : document.removeEventListener('click', closeNavbar.current);
  }, [isActive]);

  return (
    <>
      <div className={`navbar ${isActive ? 'active' : ''}`}>
        <div className='container'>
          <div className='navbar__menu'>
            <NavBarItem to={'/'} icon={'tuning-fork'}>
              Tuner
            </NavBarItem>
            <NavBarItem to={'/settings'} icon={'settings-2'}>
              Settings
            </NavBarItem>
          </div>
        </div>
      </div>
      <Hamburger clickHandler={hamburgerClick} />
    </>
  );
};

export default NavBar;
