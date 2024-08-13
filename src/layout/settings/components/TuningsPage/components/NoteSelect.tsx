import { memo } from 'react';
import { useActions } from '@store/hooks';
import Select from 'react-select';
import { Note } from '@store/types/state';
import { useParams } from 'react-router-dom';
import { createStyles, createTheme } from '@utilities/SelectComponentStyles';

const Styles = createStyles<NoteSelectOption>();

type NoteSelectOption = {
  value: number;
  label: string;
};

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

type NoteSelectProps = {
  data: Note;
};

const NoteSelect = ({ data }: NoteSelectProps) => {
  const { set_note } = useActions();

  const { id: tuningID } = useParams<urlParams>();

  const { value, id: noteID } = data;

  const onSelectChange = (value: NoteSelectOption | null) => {
    if (!value) return;

    set_note(tuningID, data, value.value);
  };

  return (
    <Select<NoteSelectOption>
      id={`note-select-${noteID}`}
      className="tuning-page__note-select"
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

export default memo(NoteSelect);
