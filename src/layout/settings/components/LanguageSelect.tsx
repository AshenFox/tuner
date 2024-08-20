import { memo } from 'react';
import { useActions, useAppSelector } from '@store/hooks';
import Select from 'react-select';
import {
  createTheme,
  createStylesSmall,
} from '@utilities/SelectComponentStyles';

const Style = createStylesSmall<LanguageSelectOption>();

type LanguageSelectOption = {
  value: 'RU' | 'ENG';
  label: 'RU' | 'ENG';
};

const optionsOctaveSelect: LanguageSelectOption[] = [
  { value: 'RU', label: 'RU' },
  { value: 'ENG', label: 'ENG' },
];

const LanguageSelect = () => {
  const language = useAppSelector(s => s.main.settings.language);

  const { switch_language } = useActions();

  const activeOption = optionsOctaveSelect.find(
    option => option.value === language.language
  );

  const onSelectChange = (value: LanguageSelectOption | null) => {
    if (!value) return;

    switch_language(value.value);
  };

  return (
    <Select<LanguageSelectOption>
      id="language-select"
      className="settings__language-select"
      theme={createTheme}
      options={optionsOctaveSelect}
      isSearchable={false}
      onChange={onSelectChange}
      value={activeOption}
      instanceId="react-select-created"
      styles={Style}
      menuPlacement="auto"
    />
  );
};

export default memo(LanguageSelect);
