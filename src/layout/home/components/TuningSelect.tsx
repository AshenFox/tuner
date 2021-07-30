import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { set_active_tuning } from '../../../store/actions/mainActions';
import Select from 'react-select';
import { createTheme, StylesSmall } from '../../../utilities/SelectComponentStyles';

interface TuningSelectOption {
  value: string;
  label: string;
  active: boolean;
}

interface OwnProps {}

type Props = OwnProps;

const TuningSelect: React.FC<Props> = (props) => {
  const { tunings } = useAppSelector((state) => state.main);

  const dispatch = useAppDispatch();

  const optionsTuningSelect: TuningSelectOption[] = tunings.map(
    ({ id, name, active }) => ({
      value: id,
      label: name ? name : 'No title',
      active,
    })
  );

  const activeOption = optionsTuningSelect.find((option) => option.active);

  const onSelectChange = (tuning: TuningSelectOption | null) => {
    if (!tuning) return;

    dispatch(set_active_tuning(tuning.value));
  };

  return (
    <Select
      className={'tuning-select'}
      theme={createTheme}
      options={optionsTuningSelect}
      isSearchable={false}
      onChange={onSelectChange}
      value={activeOption}
      instanceId='react-select-created'
      styles={StylesSmall}
    />
  );
};

export default TuningSelect;
