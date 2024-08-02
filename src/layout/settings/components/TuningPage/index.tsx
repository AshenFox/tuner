import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '@store/store';
import { edit_tuning_name, add_string } from '@store/actions/mainActions';
import AddButton from '../AddButton';
import TuningPageString from './String';
import { useParams } from 'react-router-dom';

type urlParams = {
  id: string;
};

const TuningsPage = () => {
  const dispatch = useAppDispatch();

  const {
    tunings,
    settings: { language },
  } = useAppSelector((state) => state.main);

  const { id } = useParams<urlParams>();

  const { name, data = [] } = tunings.find((tuning) => tuning.id === id) || {};

  const addStringClickHandler = (e: React.MouseEvent) => {
    dispatch(add_string(id));

    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0);
  };

  const onChangeHeaderHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(edit_tuning_name(id, e.target.value));

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
            key={i}
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
