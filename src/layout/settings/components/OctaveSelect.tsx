import React from 'react';
import Select from 'react-select';

interface OwnProps {}

type Props = OwnProps;

const optionsOctaveSelect = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
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

const OctaveSelect: React.FC<Props> = (props) => {
  return (
    <Select
      className={'tuning-page__octave-select'}
      theme={createCustomTheme}
      options={optionsOctaveSelect}
      isSearchable={false}
      /* onChange={changeSelectCreated} */
      /* value={optionsNoteSelect[0]} */
      instanceId='react-select-created'
      styles={customStyles}
    />
  );
};

export default OctaveSelect;
