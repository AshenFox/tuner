import React from 'react';
import Select from 'react-select';

interface OwnProps {}

const optionsTuningSelect = [
  { value: 'Guitar standart', label: 'Guitar standart' },
  { value: 'Drop D', label: 'Drop D' },
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
    maxHeight: 100,
  }),
};

type Props = OwnProps;

const TuningSelect: React.FC<Props> = (props) => {
  return (
    <Select
      className={'tuning-select'}
      theme={createCustomTheme}
      options={optionsTuningSelect}
      isSearchable={false}
      /* onChange={changeSelectCreated} */
      /* value={optionsTuningSelect[0]} */
      instanceId='react-select-created'
      styles={customStyles}
    />
  );
};

export default TuningSelect;
