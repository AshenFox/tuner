import React from 'react';
import { Link } from 'react-router-dom';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const TuningsList = (props: Props) => {
  return (
    <div className='container'>
      <h1 className='settings__header'>Tunings list</h1>
      <div className='tunings-list'>
        <div className='tunings-list__item'>
          <div className='tunings-list__info'>
            <span className='tunings-list__number'>1.</span>
            <span className='tunings-list__name'>Standart tuning</span>
          </div>
          <div className='tunings-list__line'></div>
          <div className='tunings-list__controls'>
            <Link to='/settings/tuning-page'>
              <svg className='tunings-list__edit-icon'>
                <use href='../svg/sprite.svg#icon__edit'></use>
              </svg>
            </Link>
            <svg className='tunings-list__delete-icon'>
              <use href='../svg/sprite.svg#icon__delete'></use>
            </svg>
          </div>
        </div>
        <div className='tunings-list__item'>
          <div className='tunings-list__info'>
            <span className='tunings-list__number'>2.</span>
            <span className='tunings-list__name'>Drop D</span>
          </div>
          <div className='tunings-list__line'></div>
          <div className='tunings-list__controls'>
            <Link to='/settings/tuning-page'>
              <svg className='tunings-list__edit-icon'>
                <use href='../svg/sprite.svg#icon__edit'></use>
              </svg>
            </Link>
            <svg className='tunings-list__delete-icon'>
              <use href='../svg/sprite.svg#icon__delete'></use>
            </svg>
          </div>
        </div>
        {/* <div className='tunings__item'>
            <span>Something 1</span>
          </div>

          <div className='tunings__item'>
            <span>Something 2</span>
          </div> */}
      </div>
      <div className='settings__add'>
        <span>Add a new tuning</span>
        <svg className='settings__add-icon'>
          <use href='../svg/sprite.svg#icon__add'></use>
        </svg>
      </div>
    </div>
  );
};

export default TuningsList;
