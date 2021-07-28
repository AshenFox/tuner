import React from 'react';
import AddButton from './AddButton';
import TuningsListItem from './TuningListItem';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { add_tuning } from '../../../store/actions/mainActions';

interface OwnProps {}

type Props = OwnProps;

const TuningsList: React.FC<Props> = (props) => {
  const { tunings } = useAppSelector((state) => state.main);

  const dispatch = useAppDispatch();

  const addTuningClickHandler = (e: React.MouseEvent) => dispatch(add_tuning());

  return (
    <div className='container'>
      <h1 className='settings__header'>Tunings list</h1>
      <div className='tunings-list'>
        {tunings.map(({ name, id }, i) => (
          <TuningsListItem number={i + 1} id={id}>
            {name}
          </TuningsListItem>
        ))}
        {!tunings.length && (
          <div className='settings__empty'>You don't have any tunings yet.</div>
        )}
      </div>
      <AddButton clickHandler={addTuningClickHandler}>Add a new tuning</AddButton>
    </div>
  );
};

export default TuningsList;
