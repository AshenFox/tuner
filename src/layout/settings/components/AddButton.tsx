import { memo, MouseEvent, ReactNode } from 'react';

type AddButtonProps = {
  children: ReactNode;
  clickHandler: (e: MouseEvent) => void;
  isActive?: boolean;
};

const AddButton = ({
  children,
  clickHandler,
  isActive = true,
}: AddButtonProps) => {
  const onClickDefault = () => {};

  return (
    <div
      className={`settings__add ${isActive ? 'active' : ''}`}
      onClick={isActive ? clickHandler : onClickDefault}
    >
      <span>{children}</span>
      <svg className="settings__add-icon">
        <use href={`${window.location.origin}/svg/sprite.svg#icon__add`}></use>
      </svg>
    </div>
  );
};

export default memo(AddButton);
