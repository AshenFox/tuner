import { memo, MouseEventHandler } from 'react';

type HamburgerProps = {
  clickHandler: MouseEventHandler;
};

const Hamburger = ({ clickHandler }: HamburgerProps) => (
  <button
    onClick={clickHandler}
    className="hamburger hamburger--spring"
    type="button"
  >
    <span className="hamburger__box">
      <span className="hamburger__inner" />
    </span>
  </button>
);

export default memo(Hamburger);
