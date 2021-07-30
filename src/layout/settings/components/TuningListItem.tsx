import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { delete_tuning } from '../../../store/actions/mainActions';

interface OwnProps {
  number: number;
  name: string;
  id: string;
}

type Props = OwnProps;

const TuningsListItem: React.FC<Props> = ({ number, name, id }) => {
  const dispatch = useAppDispatch();

  const deleteTuningClickHandler = (e: React.MouseEvent) => dispatch(delete_tuning(id));

  return (
    <div className='tunings-list__item'>
      <div className='tunings-list__info'>
        <span className='tunings-list__number'>{number}.</span>
        <span className='tunings-list__name'>{name ? name : 'No title'}</span>
      </div>
      <div className='tunings-list__line'></div>
      <div className='tunings-list__controls'>
        <Link to={`/settings/tuning-page/${id}`}>
          <svg className='tunings-list__edit-icon'>
            <use href={`${window.location.origin}/svg/sprite.svg#icon__edit`}></use>
          </svg>
        </Link>
        <svg className='tunings-list__delete-icon' onClick={deleteTuningClickHandler}>
          <use href={`${window.location.origin}/svg/sprite.svg#icon__delete`}></use>
        </svg>
      </div>
    </div>
  );
};

export default TuningsListItem;
