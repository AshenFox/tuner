import React from 'react';
import { Tuning } from '../../../../store/types/state';
import Controls from './Controls';

interface OwnProps {
  number: number;
  data: Tuning;
}

type Props = OwnProps;

const ListItem: React.FC<Props> = ({ number, data }) => {
  const { name } = data;

  return (
    <div className='tunings-list__item'>
      <div className='tunings-list__info'>
        <span className='tunings-list__number'>{number}.</span>
        <span className='tunings-list__name'>{name ? name : 'No title'}</span>
      </div>
      <div className='tunings-list__line'></div>
      <Controls data={data} />
    </div>
  );
};

export default ListItem;
