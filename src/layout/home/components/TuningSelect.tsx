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
  const tunings = useAppSelector(s => s.main.tunings);
  const language = useAppSelector(s => s.main.settings.language);
  const active_tuning_id = useAppSelector(s => s.main.active_tuning_id);

  const { set_active_tuning } = useActions();

  const optionsTuningSelect: TuningSelectOption[] = tunings.map(
    ({ id, name, is_default, default_key }) => {
      const defaultLabel = is_default
        ? language.tunings.default[default_key]
        : name;

      return {
        value: id,
        label: name ? defaultLabel : language.tunings.title_placeholder,
        active: id === active_tuning_id,
      };
    }
  );

  const activeOption = optionsTuningSelect.find(
    ({ value: id }) => id === active_tuning_id
  );

  const onSelectChange = (tuning: TuningSelectOption | null) => {
    if (!tuning) return;

    set_active_tuning(tuning.value);
  };

  return (
    <Select
      className="tuning-select"
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
