import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/store';
import Hamburger from './components/Hamburger';
import NavBarItem from './components/NavbarItem';

interface OwnProps {}

type Props = OwnProps;

const NavBar: React.FC<Props> = (props) => {
  const {
    settings: { language },
  } = useAppSelector((state) => state.main);

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
              {language.navbar.options.tuner}
            </NavBarItem>
            <NavBarItem to={'/settings'} icon={'settings-2'}>
              {language.navbar.options.settings}
            </NavBarItem>
          </div>
        </div>
      </div>
      <Hamburger clickHandler={hamburgerClick} />
    </>
  );
};

export default NavBar;
