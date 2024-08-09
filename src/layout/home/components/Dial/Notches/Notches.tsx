import { memo } from 'react';
import Notch from './Notch';

type NotchesProps = {
  num: number;
};

const Notches = ({ num }: NotchesProps) => {
  return (
    <>
      {[...new Array(num)].map((_, i) => (
        <Notch key={i} deg={i} />
      ))}
    </>
  );
};

export default memo(Notches);
