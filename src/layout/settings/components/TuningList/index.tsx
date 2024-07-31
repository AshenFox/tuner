import React from 'react';
import AddButton from '../AddButton';
import ListItem from './ListItem';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { add_tuning } from '../../../../store/actions/mainActions';

interface OwnProps {}

type Props = OwnProps;

const TuningsList: React.FC<Props> = (props) => {
  const {
    tunings,
    settings: { language },
  } = useAppSelector((state) => state.main);

  const dispatch = useAppDispatch();

  const addTuningClickHandler = (e: React.MouseEvent) => {
    dispatch(add_tuning());

    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0);
  };

  return (
    <div className="container">
      <h1 className="settings__header">
        {language.settings.tunings_list.header}
      </h1>
      <div className="tunings-list">
        {tunings.map((tuning, i) => (
          <ListItem key={tuning.id} number={i + 1} data={tuning} />
        ))}
        {!tunings.length && (
          <div className="settings__empty">
            You don&apos;t have any tunings yet.
          </div>
        )}
      </div>
      <AddButton clickHandler={addTuningClickHandler}>
        {language.settings.tunings_list.add_button}
      </AddButton>
    </div>
  );
};

export default TuningsList;
