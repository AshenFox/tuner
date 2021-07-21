import React from 'react';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const TuningsPage = (props: Props) => {
  return (
    <div className='tuning-page'>
      <div className='container'>
        <h1 className='tuning-page__header'>Tuning page</h1>
        <div className='tuning-page__list'>
          <div className='tuning-page__string'>
            <span className='tuning-page__number'>1.</span>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__info'>
              <div className='tuning-page__note-select '>
                <div className='tuning-page__note tuning-page__note--1'>
                  <span>C</span>
                </div>
                <div className='tuning-page__note tuning-page__note--2'>
                  <span>C#</span>
                </div>
                <div className='tuning-page__note tuning-page__note--3'>
                  <span>D</span>
                </div>
                <div className='tuning-page__note tuning-page__note--4'>
                  <span>D#</span>
                </div>
                <div className='tuning-page__note tuning-page__note--5'>
                  <span>E</span>
                </div>
                <div className='tuning-page__note tuning-page__note--6'>
                  <span>F</span>
                </div>
                <div className='tuning-page__note tuning-page__note--7'>
                  <span>F#</span>
                </div>
                <div className='tuning-page__note tuning-page__note--8'>
                  <span>G</span>
                </div>
                <div className='tuning-page__note tuning-page__note--9'>
                  <span>G#</span>
                </div>
                <div className='tuning-page__note tuning-page__note--10'>
                  <span>A</span>
                </div>
                <div className='tuning-page__note tuning-page__note--11'>
                  <span>A#</span>
                </div>
                <div className='tuning-page__note tuning-page__note--12'>
                  <span>B</span>
                </div>
              </div>
              {/* <div className='tuning-page__octave-select'>
                <div className='tuning-page__octave'>1</div>
                <div className='tuning-page__octave'>2</div>
                <div className='tuning-page__octave'>3</div>
                <div className='tuning-page__octave'>4</div>
                <div className='tuning-page__octave'>5</div>
                <div className='tuning-page__octave'>6</div>
                <div className='tuning-page__octave'>7</div>
              </div> */}
            </div>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__controls'>
              <svg className='tuning-page__delete-icon'>
                <use href='../svg/sprite.svg#icon__delete'></use>
              </svg>
            </div>
          </div>
        </div>
        <div className='tuning-page__add'>
          <span>Add a new string</span>
          <svg className='tuning-page__add-icon'>
            <use href='../svg/sprite.svg#icon__add'></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TuningsPage;
