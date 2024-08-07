import { memo } from 'react';
import { useActions } from '@store/hooks';
import Select from 'react-select';
import { Note } from '@store/types/state';
import { useParams } from 'react-router-dom';
import { createTheme, createStyles } from '@utilities/SelectComponentStyles';

const Styles = createStyles<OctaveSelectOption>();

type OctaveSelectOption = {
  value: number;
  label: string;
};

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

type OctaveSelectProps = {
  data: Note;
};

const OctaveSelect = ({ data }: OctaveSelectProps) => {
  const { set_octave } = useActions();

  const { id: tuningID } = useParams<urlParams>();

  const { octave, id: noteID } = data;

  const onSelectChange = (value: OctaveSelectOption | null) => {
    if (!value) return;

    set_octave(tuningID, data, value.value);
  };

  return (
    <Select
      id={`note-select-${noteID}`}
      className={'tuning-page__octave-select'}
      theme={createTheme}
      options={optionsOctaveSelect}
      isSearchable={false}
      onChange={onSelectChange}
      value={optionsOctaveSelect[octave]}
      instanceId="react-select-created"
      styles={Styles}
    />
  );
};

export default memo(OctaveSelect);
