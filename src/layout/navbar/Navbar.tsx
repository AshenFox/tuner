import { useState, useEffect, memo, MouseEventHandler } from 'react';
import { useAppSelector } from '@store/hooks';
import Hamburger from './components/Hamburger';
import NavBarItem from './components/NavbarItem';

const NavBar = () => {
  const language = useAppSelector(s => s.main.settings.language);

  const [isActive, setIsActive] = useState(false);

  const hamburgerClick: MouseEventHandler = e => {
    e.stopPropagation();
    setIsActive(true);
  };

  const stopPropagation: MouseEventHandler = e => {
    e.stopPropagation();
  };

  useEffect(() => {
    const closeNavbar = () => setIsActive(false);
    const itemElements = document.querySelectorAll('.navbar__item');

    document.addEventListener('click', closeNavbar);
    itemElements.forEach(el => el.addEventListener('click', closeNavbar));

    return () => {
      document.removeEventListener('click', closeNavbar);
      itemElements.forEach(el => el.removeEventListener('click', closeNavbar));
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={`navbar ${isActive ? 'active' : ''}`}
        onClick={stopPropagation}
      >
        <div className="container">
          <div className="navbar__menu">
            <NavBarItem to="/" icon="tuning-fork">
              {language.navbar.options.tuner}
            </NavBarItem>
            <NavBarItem to="/settings" icon="settings-2">
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
