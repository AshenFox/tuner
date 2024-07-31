import React, { useState, useEffect, memo } from 'react';
import { useAppSelector } from '../../store/store';
import Hamburger from './components/Hamburger';
import NavBarItem from './components/NavbarItem';

interface OwnProps {}

type Props = OwnProps;

const NavBar: React.FC<Props> = () => {
  const {
    settings: { language },
  } = useAppSelector((state) => state.main);

  const [isActive, setIsActive] = useState(false);

  const hamburgerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActive(true);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const closeNavbar = () => setIsActive(false);
    const itemElements = document.querySelectorAll('.navbar__item');

    document.addEventListener('click', closeNavbar);
    itemElements.forEach((el) => el.addEventListener('click', closeNavbar));

    return () => {
      document.removeEventListener('click', closeNavbar);
      itemElements.forEach((el) =>
        el.removeEventListener('click', closeNavbar)
      );
    };
  }, []);

  return (
    <>
      <div
        className={`navbar ${isActive ? 'active' : ''}`}
        onClick={stopPropagation}
      >
        <div className="container">
          <div className="navbar__menu">
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

export default memo(NavBar);
