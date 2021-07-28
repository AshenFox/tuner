import React from 'react';
import NoteSelect from './NoteSelect';
import OctaveSelect from './OctaveSelect';

interface OwnProps {
  number: number;
}

type Props = OwnProps;

const TuningPageString: React.FC<Props> = ({ number }) => {
  return (
    <div className='tuning-page__string'>
      <span className='tuning-page__number'>{number}.</span>
      <div className='tuning-page__line'></div>
      <div className='tuning-page__info'>
        <NoteSelect />
        <OctaveSelect />
      </div>
      <div className='tuning-page__line'></div>
      <div className='tuning-page__controls'>
        <svg className='tuning-page__delete-icon'>
          <use href='../svg/sprite.svg#icon__delete'></use>
        </svg>
      </div>
    </div>
  );
};

export default TuningPageString;
