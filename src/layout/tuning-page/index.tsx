import React from 'react';
import Select from 'react-select';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const optionsNoteSelect = [
  { value: 'C', label: 'C' },
  { value: 'C#', label: 'C#' },
  { value: 'D', label: 'D' },
  { value: 'D#', label: 'D#' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'F#', label: 'F#' },
  { value: 'G', label: 'G' },
  { value: 'G#', label: 'G#' },
  { value: 'A', label: 'A' },
  { value: 'A#', label: 'A#' },
  { value: 'B', label: 'B' },
];

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

const TuningsPage = (props: Props) => {
  return (
    <div className='tuning-page'>
      <div className='container'>
        <input className='tuning-page__header' value={'Guitar standart'} />
        <div className='tuning-page__list'>
          <div className='tuning-page__string'>
            <span className='tuning-page__number'>1.</span>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__info'>
              <Select
                className={'tuning-page__note-select'}
                theme={createCustomTheme}
                options={optionsNoteSelect}
                isSearchable={false}
                /* onChange={changeSelectCreated} */
                /* value={optionsNoteSelect[0]} */
                instanceId='react-select-created'
                styles={customStyles}
              />
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
            </div>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__controls'>
              <svg className='tuning-page__delete-icon'>
                <use href='../svg/sprite.svg#icon__delete'></use>
              </svg>
            </div>
          </div>
          {/* =================== */}
          <div className='tuning-page__string'>
            <span className='tuning-page__number'>2.</span>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__info'>
              <Select
                className={'tuning-page__note-select'}
                theme={createCustomTheme}
                options={optionsNoteSelect}
                isSearchable={false}
                /* onChange={changeSelectCreated} */
                /* value={optionsNoteSelect[0]} */
                instanceId='react-select-created'
                styles={customStyles}
              />
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
            </div>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__controls'>
              <svg className='tuning-page__delete-icon'>
                <use href='../svg/sprite.svg#icon__delete'></use>
              </svg>
            </div>
          </div>
          {/* =================== */}
          <div className='tuning-page__string'>
            <span className='tuning-page__number'>3.</span>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__info'>
              <Select
                className={'tuning-page__note-select'}
                theme={createCustomTheme}
                options={optionsNoteSelect}
                isSearchable={false}
                /* onChange={changeSelectCreated} */
                /* value={optionsNoteSelect[0]} */
                instanceId='react-select-created'
                styles={customStyles}
              />
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
            </div>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__controls'>
              <svg className='tuning-page__delete-icon'>
                <use href='../svg/sprite.svg#icon__delete'></use>
              </svg>
            </div>
          </div>
          {/* =================== */}
          <div className='tuning-page__string'>
            <span className='tuning-page__number'>4.</span>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__info'>
              <Select
                className={'tuning-page__note-select'}
                theme={createCustomTheme}
                options={optionsNoteSelect}
                isSearchable={false}
                /* onChange={changeSelectCreated} */
                /* value={optionsNoteSelect[0]} */
                instanceId='react-select-created'
                styles={customStyles}
              />
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
            </div>
            <div className='tuning-page__line'></div>
            <div className='tuning-page__controls'>
              <svg className='tuning-page__delete-icon'>
                <use href='../svg/sprite.svg#icon__delete'></use>
              </svg>
            </div>
          </div>
        </div>
        <div className='tuning-page__add'>
          <span>Add a new string</span>
          <svg className='tuning-page__add-icon'>
            <use href='../svg/sprite.svg#icon__add'></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TuningsPage;
