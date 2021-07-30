import React from 'react';
import NoteSelect from './NoteSelect';
import OctaveSelect from './OctaveSelect';
import { Note } from '../../../store/types/state';

interface OwnProps {
  number: number;
  data: Note;
}

type Props = OwnProps;

const TuningPageString: React.FC<Props> = ({ number, data }) => {
  // console.log(data);

  return (
    <div className='tuning-page__string'>
      <span className='tuning-page__number'>{number}.</span>
      <div className='tuning-page__line'></div>
      <div className='tuning-page__info'>
        <NoteSelect data={data} />
        <OctaveSelect data={data} />
      </div>
      <div className='tuning-page__line'></div>
      <div className='tuning-page__controls'>
        <svg className='tuning-page__delete-icon'>
          <use href={`${window.location.origin}/svg/sprite.svg#icon__delete`}></use>
        </svg>
      </div>
    </div>
  );
};

export default TuningPageString;
