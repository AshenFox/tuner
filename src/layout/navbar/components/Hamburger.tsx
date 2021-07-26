import React from 'react';
import { Link } from 'react-router-dom';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Hamburger = (props: Props) => {
  return (
    <button className={`btn hamburger hamburger--spring`} type='button'>
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
