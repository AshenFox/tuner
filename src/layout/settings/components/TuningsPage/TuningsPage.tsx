import { memo, MouseEventHandler } from 'react';
import { useActions, useAppSelector } from '@store/hooks';
import { useParams } from 'react-router-dom';
import AddButton from '../AddButton';
import TuningPageString from './components/String';

type urlParams = {
  id: string;
};

const TuningsPage = () => {
  const { add_string, edit_tuning_name } = useActions();

  const tunings = useAppSelector(s => s.main.tunings);
  const language = useAppSelector(s => s.main.settings.language);

  const { id } = useParams<urlParams>();

  const { name, data = [] } = tunings.find(tuning => tuning.id === id) || {};

  const addStringClickHandler: MouseEventHandler = () => {
    add_string(id);

    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0);
  };

  const onChangeHeaderHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    edit_tuning_name(id, e.target.value);

  const stringsNumber = data.length;

  const isDeleteActive = stringsNumber > 4;
  const isAddActive = stringsNumber < 24;

  return (
    <div className="container">
      <input
        className="tuning-page__header"
        onChange={onChangeHeaderHandler}
        value={name}
      />
      <div className="tuning-page__list">
        {data?.map((string, i) => (
          <TuningPageString
            key={string.id}
            number={i + 1}
            data={string}
            isDeleteActive={isDeleteActive}
          />
        ))}
      </div>
      <AddButton clickHandler={addStringClickHandler} isActive={isAddActive}>
        {language.settings.tuning_page.add_button}
      </AddButton>
    </div>
  );
};

export default memo(TuningsPage);
