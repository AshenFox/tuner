import React from 'react';
import { useAppSelector } from '../../../../store/store';
import { Tuning } from '../../../../store/types/state';
import Controls from './Controls';

interface OwnProps {
  number: number;
  data: Tuning;
}

type Props = OwnProps;

const ListItem: React.FC<Props> = ({ number, data }) => {
  const {
    settings: { language },
  } = useAppSelector((state) => state.main);

  const { name, is_default, default_key } = data;

  return (
    <div className='tunings-list__item'>
      <div className='tunings-list__info'>
        <span className='tunings-list__number'>{number}.</span>
        <span className='tunings-list__name'>
          {name
            ? is_default
              ? language.tunings.default[default_key]
              : name
            : language.tunings.title_placeholder}
        </span>
      </div>
      <div className='tunings-list__line'></div>
      <Controls data={data} />
    </div>
  );
};

export default ListItem;
