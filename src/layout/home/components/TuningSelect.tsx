import { memo } from 'react';
import { useActions, useAppSelector } from '@store/hooks';
import Select from 'react-select';
import {
  createTheme,
  createStylesSmall,
} from '@utilities/SelectComponentStyles';

const Style = createStylesSmall<TuningSelectOption>();

type TuningSelectOption = {
  value: string;
  label: string;
  active: boolean;
};

const TuningSelect = () => {
  const {
    tunings,
    settings: { language },
  } = useAppSelector((state) => state.main);

  const { set_active_tuning } = useActions();

  const optionsTuningSelect: TuningSelectOption[] = tunings.map(
    ({ id, name, active, is_default, default_key }) => ({
      value: id,
      label: name
        ? is_default
          ? language.tunings.default[default_key]
          : name
        : language.tunings.title_placeholder,
      active,
    })
  );

  const activeOption = optionsTuningSelect.find((option) => option.active);

  const onSelectChange = (tuning: TuningSelectOption | null) => {
    if (!tuning) return;

    set_active_tuning(tuning.value);
  };

  return (
    <Select
      className={'tuning-select'}
      theme={createTheme}
      options={optionsTuningSelect}
      isSearchable={false}
      onChange={onSelectChange}
      value={activeOption}
      instanceId="react-select-created"
      styles={Style}
    />
  );
};

export default memo(TuningSelect);
