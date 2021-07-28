import React, { memo } from 'react';
import Fr from './Fr';

interface OwnProps {
  num: number;
}

type Props = OwnProps;

const Frs: React.FC<Props> = ({ num }) => {
  return (
    <>
      {[...new Array(num / 5)].map((_, i) => (
        <Fr key={i * 5} deg={i * 5} />
      ))}
    </>
  );
};

export default memo(Frs);
