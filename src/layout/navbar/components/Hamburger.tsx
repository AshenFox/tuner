import { memo, MouseEventHandler } from 'react';

type HamburgerProps = {
  clickHandler: MouseEventHandler;
};

const Hamburger = ({ clickHandler }: HamburgerProps) => {
  return (
    <button
      onClick={clickHandler}
      className={`btn hamburger hamburger--spring`}
      type="button"
    >
      <span className="hamburger__box">
        <span className="hamburger__inner"></span>
      </span>
    </button>
  );
};

export default memo(Hamburger);
