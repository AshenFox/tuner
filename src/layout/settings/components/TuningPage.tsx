import React from 'react';
import AddButton from './AddButton';
import TuningPageString from './TuningPageString';

interface OwnProps {}

type Props = OwnProps;

const TuningsPage: React.FC<Props> = (props) => {
  const addStringClickHandler = (e: React.MouseEvent) => {};

  return (
    <div className='container'>
      <input className='tuning-page__header' value={'Guitar standart'} />
      <div className='tuning-page__list'>
        <TuningPageString number={1} />
        <TuningPageString number={2} />
        <TuningPageString number={3} />
        <TuningPageString number={4} />
      </div>
      <AddButton clickHandler={addStringClickHandler}>Add a new string</AddButton>
    </div>
  );
};

export default TuningsPage;
