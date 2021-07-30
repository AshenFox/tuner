import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { edit_tuning_name } from '../../../store/actions/mainActions';
import AddButton from './AddButton';
import TuningPageString from './TuningPageString';
import { useParams } from 'react-router-dom';

type urlParams = {
  id: string;
};

interface OwnProps {}

type Props = OwnProps;

const TuningsPage: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const { tunings } = useAppSelector((state) => state.main);

  const { id } = useParams<urlParams>();

  const { name, data } = tunings.find((tuning) => tuning.id === id) || {};

  const addStringClickHandler = (e: React.MouseEvent) => {};

  const onChangeHeaderHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(edit_tuning_name(id, e.target.value));

  return (
    <div className='container'>
      <input
        className='tuning-page__header'
        onChange={onChangeHeaderHandler}
        value={name}
      />
      <div className='tuning-page__list'>
        {data?.map((string, i) => (
          <TuningPageString key={i} number={i + 1} data={string} />
        ))}
      </div>
      <AddButton clickHandler={addStringClickHandler}>Add a new string</AddButton>
    </div>
  );
};

export default TuningsPage;
