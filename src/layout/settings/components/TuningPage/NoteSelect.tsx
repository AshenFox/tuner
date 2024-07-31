import React from 'react';
import { useAppDispatch } from '../../../../store/store';
import { set_note } from '../../../../store/actions/mainActions';
import Select from 'react-select';
import { Note } from '../../../../store/types/state';
import { useParams } from 'react-router-dom';
import {
  createTheme,
  Styles,
} from '../../../../utilities/SelectComponentStyles';

interface NoteSelectOption {
  value: number;
  label: string;
}

type urlParams = {
  id: string;
};

const optionsNoteSelect: NoteSelectOption[] = [
  { value: 1, label: 'C' },
  { value: 2, label: 'C#' },
  { value: 3, label: 'D' },
  { value: 4, label: 'D#' },
  { value: 5, label: 'E' },
  { value: 6, label: 'F' },
  { value: 7, label: 'F#' },
  { value: 8, label: 'G' },
  { value: 9, label: 'G#' },
  { value: 10, label: 'A' },
  { value: 11, label: 'A#' },
  { value: 12, label: 'B' },
];

interface OwnProps {
  data: Note;
}

type Props = OwnProps;

const NoteSelect: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const { id: tuningID } = useParams<urlParams>();

  const { value, id: noteID } = data;

  const onSelectChange = (value: NoteSelectOption | null) => {
    if (!value) return;

    dispatch(set_note(tuningID, data, value.value));
  };

  return (
    <Select
      id={`note-select-${noteID}`}
      className={'tuning-page__note-select'}
      theme={createTheme}
      options={optionsNoteSelect}
      isSearchable={false}
      onChange={onSelectChange}
      value={optionsNoteSelect[value - 1]}
      instanceId="react-select-created"
      styles={Styles}
    />
  );
};

export default NoteSelect;
