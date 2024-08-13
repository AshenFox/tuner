import { memo } from 'react';
import { useAppSelector } from '@store/hooks';

type FrProps = {
  deg: number;
};

const Fr = ({ deg }: FrProps) => {
  const most_freq_fr = useAppSelector(s => s.main.most_freq_fr);

  const style = { transform: `rotate(${deg * 1.5}deg)` };

  let position = deg;

  let k = 10;

  let value = calcValues(deg, position, k, most_freq_fr, 0);

  if (value > 48) {
    position = ((value - 48) % (240 / k)) * 10;
    k = 5;
    value = calcValues(deg, position, k, most_freq_fr, 48);
  }

  if (value > 60) {
    position = ((value - 60) % (240 / k)) * 5;
    k = 2.5;
    value = calcValues(deg, position, k, most_freq_fr, 60);
  }

  if (value > 120) {
    position = ((value - 120) % (240 / k)) * 2.5; // 2.5 ???
    k = 2;
    value = calcValues(deg, position, k, most_freq_fr, 120);
  }

  if (value > 200) {
    position = ((value - 200) % (240 / k)) * 2;
    k = 1;
    value = calcValues(deg, position, k, most_freq_fr, 200);
  }

  if (value > 720) {
    position = (value - 720) % (240 / k);
    k = 0.5;
    value = calcValues(deg, position, k, most_freq_fr, 720);
  }

  return (
    <div className="dial__fr-cont" style={style}>
      <span className="dial__fr">{value}</span>
    </div>
  );
};

export default memo(Fr);

const calcValues = (
  deg: number,
  position: number,
  k: number,
  fr: number,
  fr_offset: number = 0
) => {
  const offset = position / k - 120 / k;
  let n = Math.floor((fr - fr_offset - offset - 0.01) / (240 / k));

  if (k === 10 && fr > 48 && fr < 60 && deg >= 180) {
    n = 1;
    k = 10;
  }

  if (k === 5 && fr > 60 && fr < 84 && deg <= 60) {
    n = 0;
    k = 5;
  }

  if (k === 2.5 && fr > 200 && fr < 260 && deg >= 110 && deg <= 170) {
    n = 1;
    k = 2.5;
  }

  if (k === 1 && fr > 720 && fr < 840 && deg >= 60 && deg <= 120) {
    n = 2;
    k = 1;
  }

  const value = position / k + (240 / k) * n + fr_offset;

  return value;
};
