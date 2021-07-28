import React from 'react';

interface OwnProps {
  clickHandler: (e: React.MouseEvent) => void;
}

type Props = OwnProps;

const Hamburger: React.FC<Props> = ({ clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className={`btn hamburger hamburger--spring`}
      type='button'
    >
      <span className='hamburger__box'>
        <span className='hamburger__inner'></span>
      </span>
    </button>
  );
};

export default Hamburger;

/* 
active
*/
