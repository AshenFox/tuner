import React from 'react';
import { useAppDispatch } from '../../../store/store';
import { set_octave } from '../../../store/actions/mainActions';
import Select from 'react-select';
import { Note } from '../../../store/types/state';
import { useParams } from 'react-router-dom';
import { createTheme, Styles } from '../../../utilities/SelectComponentStyles';

interface OctaveSelectOption {
  value: number;
  label: string;
}

type urlParams = {
  id: string;
};

const optionsOctaveSelect: OctaveSelectOption[] = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
];

interface OwnProps {
  data: Note;
}

type Props = OwnProps;

const OctaveSelect: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const { id: tuningID } = useParams<urlParams>();

  const { octave } = data;

  const onSelectChange = (value: OctaveSelectOption | null) => {
    if (!value) return;

    console.log(value.value);

    dispatch(set_octave(tuningID, data, value.value));
  };

  return (
    <Select
      className={'tuning-page__octave-select'}
      theme={createTheme}
      options={optionsOctaveSelect}
      isSearchable={false}
      onChange={onSelectChange}
      value={optionsOctaveSelect[octave]}
      instanceId='react-select-created'
      styles={Styles}
    />
  );
};

export default OctaveSelect;
