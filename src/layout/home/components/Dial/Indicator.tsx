import React from 'react';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const DetFr: React.FC<Props> = () => {
  return (
    <div className='dial__indicator-cont'>
      <div className='dial__indicator'>
        120<span>Hz</span>
      </div>
      <div className='dial__indicator-tip'>lower</div>
    </div>
  );
};

export default DetFr;
