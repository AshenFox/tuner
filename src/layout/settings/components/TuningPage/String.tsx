import React, { memo } from 'react';
import { useAppDispatch } from '@store/store';
import { delete_string } from '@store/actions/mainActions';
import NoteSelect from './NoteSelect';
import OctaveSelect from './OctaveSelect';
import { Note } from '@store/types/state';
import { useParams } from 'react-router-dom';

type urlParams = {
  id: string;
};

type TuningPageStringProps = {
  number: number;
  data: Note;
  isDeleteActive: boolean;
};

const TuningPageString = ({
  number,
  data,
  isDeleteActive,
}: TuningPageStringProps) => {
  const dispatch = useAppDispatch();

  const { id: tuning_id } = useParams<urlParams>();

  const { id: string_id } = data;

  const onClickDelete = (e: React.MouseEvent) => {
    if (isDeleteActive) dispatch(delete_string(tuning_id, string_id));
  };

  return (
    <div className="tuning-page__string">
      <span className="tuning-page__number">{number}.</span>
      <div className="tuning-page__line"></div>
      <div className="tuning-page__info">
        <NoteSelect data={data} />
        <OctaveSelect data={data} />
      </div>
      <div className="tuning-page__line"></div>
      <div className="tuning-page__controls">
        <svg
          className={`tuning-page__delete-icon ${isDeleteActive ? 'active' : ''}`}
          onClick={onClickDelete}
        >
          <use
            href={`${window.location.origin}/svg/sprite.svg#icon__delete`}
          ></use>
        </svg>
      </div>
    </div>
  );
};

export default memo(TuningPageString);
