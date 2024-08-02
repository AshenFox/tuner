import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@store/store';
import { delete_tuning } from '@store/actions/mainActions';
import { Tuning } from '@store/types/state';

type ControlsProps = {
  data: Tuning;
};

const Controls = ({ data }: ControlsProps) => {
  const { id, is_default } = data;

  const dispatch = useAppDispatch();

  const deleteTuningClickHandler = (e: React.MouseEvent) =>
    dispatch(delete_tuning(id));

  const editIcon = (
    <svg className={`tunings-list__edit-icon ${is_default ? '' : 'active'}`}>
      <use href={`${window.location.origin}/svg/sprite.svg#icon__edit`}></use>
    </svg>
  );

  return (
    <div className="tunings-list__controls">
      {is_default ? (
        editIcon
      ) : (
        <Link to={`/settings/tuning-page/${id}`}>{editIcon}</Link>
      )}
      <svg
        className={`tunings-list__delete-icon ${is_default ? '' : 'active'}`}
        onClick={is_default ? () => {} : deleteTuningClickHandler}
      >
        <use
          href={`${window.location.origin}/svg/sprite.svg#icon__delete`}
        ></use>
      </svg>
    </div>
  );
};

export default memo(Controls);
