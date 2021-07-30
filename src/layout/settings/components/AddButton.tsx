import React from 'react';

interface OwnProps {
  children: React.ReactNode;
  clickHandler: (e: React.MouseEvent) => void;
}

type Props = OwnProps;

const AddButton: React.FC<Props> = ({ children, clickHandler }) => {
  return (
    <div className='settings__add' onClick={clickHandler}>
      <span>{children}</span>
      <svg className='settings__add-icon'>
        <use href={`${window.location.origin}/svg/sprite.svg#icon__add`}></use>
      </svg>
    </div>
  );
};

export default AddButton;
