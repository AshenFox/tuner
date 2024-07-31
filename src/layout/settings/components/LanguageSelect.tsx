import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { switch_language } from '../../../store/actions/mainActions';
import Select from 'react-select';
import {
  createTheme,
  StylesSmall,
} from '../../../utilities/SelectComponentStyles';

interface LanguageSelectOption {
  value: 'RU' | 'ENG';
  label: 'RU' | 'ENG';
}

const optionsOctaveSelect: LanguageSelectOption[] = [
  { value: 'RU', label: 'RU' },
  { value: 'ENG', label: 'ENG' },
];

const LanguageSelect = () => {
  const {
    settings: { language },
  } = useAppSelector((state) => state.main);

  const dispatch = useAppDispatch();

  const activeOption = optionsOctaveSelect.find(
    (option) => option.value === language.language
  );

  const onSelectChange = (value: LanguageSelectOption | null) => {
    if (!value) return;

    dispatch(switch_language(value.value));
  };

  return (
    <Select
      id={`language-select`}
      className={'settings__language-select'}
      theme={createTheme}
      options={optionsOctaveSelect}
      isSearchable={false}
      onChange={onSelectChange}
      value={activeOption}
      instanceId="react-select-created"
      styles={StylesSmall}
      menuPlacement="auto"
    />
  );
};

export default memo(LanguageSelect);
