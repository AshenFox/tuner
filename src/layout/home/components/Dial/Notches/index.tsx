import React, { memo } from 'react';
import Notch from './Notch';

interface OwnProps {
  num: number;
}

type Props = OwnProps;

const Notches: React.FC<Props> = ({ num }) => {
  return (
    <>
      {[...new Array(num)].map((_, i) => (
        <Notch key={i} deg={i} />
      ))}
    </>
  );
};

export default memo(Notches);
