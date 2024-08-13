import { memo } from 'react';
import Notch from './Notch';

type NotchesProps = {
  num: number;
};

const Notches = ({ num }: NotchesProps) => (
  <>
    {[...new Array(num)].map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Notch key={i} deg={i} />
    ))}
  </>
);

export default memo(Notches);
