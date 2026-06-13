import { memo } from 'react';
import { useAppSelector } from '@store/hooks';
import { labelForNotch } from '@utilities/dialScale';

type FrProps = {
  deg: number;
};

const Fr = ({ deg }: FrProps) => {
  const most_freq_fr = useAppSelector(s => s.main.most_freq_fr);

  const style = { transform: `rotate(${deg * 1.5}deg)` };

  const value = labelForNotch(deg, most_freq_fr);

  return (
    <div className="dial__fr-cont" style={style}>
      <span className="dial__fr">{value > 0 ? Number(value.toFixed(2)) : ''}</span>
    </div>
  );
};

export default memo(Fr);
