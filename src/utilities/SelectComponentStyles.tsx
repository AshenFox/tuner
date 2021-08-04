export const createTheme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#533592',
    primary: '#ec3000',
    neutral0: '#533592',
    neutral80: '#fff',
  },
});

export const Styles = {
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

export const StylesSmall = {
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
