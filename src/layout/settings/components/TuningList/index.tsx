import { memo, MouseEventHandler } from 'react';
import AddButton from '../AddButton';
import ListItem from './ListItem';
import { useActions, useAppSelector } from '@store/hooks';

const TuningsList = () => {
  const tunings = useAppSelector(s => s.main.tunings);
  const language = useAppSelector(s => s.main.settings.language);

  const { add_tuning } = useActions();

  const addTuningClickHandler: MouseEventHandler = () => {
    add_tuning();

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

export default memo(TuningsList);
