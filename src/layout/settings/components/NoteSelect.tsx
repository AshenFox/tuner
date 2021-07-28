import React from 'react';
import Select from 'react-select';

interface OwnProps {}

type Props = OwnProps;

const optionsNoteSelect = [
  { value: 'C', label: 'C' },
  { value: 'C#', label: 'C#' },
  { value: 'D', label: 'D' },
  { value: 'D#', label: 'D#' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'F#', label: 'F#' },
  { value: 'G', label: 'G' },
  { value: 'G#', label: 'G#' },
  { value: 'A', label: 'A' },
  { value: 'A#', label: 'A#' },
  { value: 'B', label: 'B' },
];

const createCustomTheme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#ec3000',
    primary: '#ec3000',
    neutral0: '#533592',
    neutral80: '#fff',
  },
});

const customStyles = {
  dropdownIndicator: (provided: any) => ({
    ...provided,
    paddingLeft: 3,
    paddingRight: 3,
  }),
  menuList: (provided: any) => ({
    ...provided,
    height: 150,
  }),
};

const NoteSelect: React.FC<Props> = (props) => {
  return (
    <Select
      className={'tuning-page__note-select'}
      theme={createCustomTheme}
      options={optionsNoteSelect}
      isSearchable={false}
      /* onChange={changeSelectCreated} */
      /* value={optionsNoteSelect[0]} */
      instanceId='react-select-created'
      styles={customStyles}
    />
  );
};

export default NoteSelect;
