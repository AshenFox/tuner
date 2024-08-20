import { memo } from 'react';
import Fr from './Fr';

type FrsProps = {
  num: number;
};

const Frs = ({ num }: FrsProps) => (
  <>
    {[...new Array(num / 5)].map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fr key={i * 5} deg={i * 5} />
    ))}
  </>
);

export default memo(Frs);
