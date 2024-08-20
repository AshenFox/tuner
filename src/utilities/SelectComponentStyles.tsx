import {
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
  Theme,
} from 'react-select';

export const createTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#533592',
    primary: '#ec3000',
    neutral0: '#533592',
    neutral80: '#fff',
  },
});

export const createStyles: <T>() => StylesConfig<
  T,
  false,
  GroupBase<T>
> = () => ({
  dropdownIndicator: provided => ({
    ...provided,
    paddingLeft: 3,
    paddingRight: 3,
  }),
  menuList: provided => ({
    ...provided,
    height: 150,
  }),
  option: (provided, state) => {
    const res: CSSObjectWithLabel = { ...provided, cursor: 'pointer' };
    if (state.isSelected) res.color = '#fff';
    return res;
  },
});

export const createStylesSmall: <T>() => StylesConfig<
  T,
  false,
  GroupBase<T>
> = () => ({
  dropdownIndicator: provided => ({
    ...provided,
    paddingLeft: 3,
    paddingRight: 3,
  }),
  menuList: provided => ({
    ...provided,
    maxHeight: 100,
  }),
  option: (provided, state) => {
    const res: CSSObjectWithLabel = { ...provided, cursor: 'pointer' };
    if (state.isSelected) res.color = '#fff';
    return res;
  },
});
