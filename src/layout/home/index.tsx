import React from 'react';
import Dial from './components/Dial';
import PitchDetector from './components/PitchDetector';
import Tuning from './components/Tuning';
import Select from 'react-select';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

const optionsTuningSelect = [
  { value: 'Guitar standart', label: 'Guitar standart' },
  { value: 'Drop D', label: 'Drop D' },
  { value: 'Guitar standart', label: 'Guitar standart' },
  { value: 'Guitar standart', label: 'Guitar standart' },
  { value: 'Guitar standart', label: 'Guitar standart' },
  { value: 'Guitar standart', label: 'Guitar standart' },
  { value: 'Guitar standart', label: 'Guitar standart' },
  { value: 'Guitar standart', label: 'Guitar standart' },
  { value: 'Guitar standart', label: 'Guitar standart' },
  { value: 'Guitar standart', label: 'Guitar standart' },
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

type Props = OwnProps & StateProps & DispatchProps;

const Home = (props: Props) => {
  return (
    <div className='home'>
      <div className='container'>
        <Dial />
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
        <Tuning />
        <PitchDetector />
      </div>
    </div>
  );
};

export default Home;
