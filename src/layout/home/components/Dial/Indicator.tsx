import React from 'react';
import { useAppSelector } from '../../../../store/store';

interface OwnProps {}

type Props = OwnProps;

const Indicator: React.FC<Props> = (props) => {
  const { most_freq_fr, tunings } = useAppSelector((state) => state.main);

  const value: number = Math.round(most_freq_fr * 10) / 10;

  const activeTuning = tunings.find((tuning) => tuning.active);
  const activeStringFr = activeTuning?.data.find(({ active }) => active)?.fr;

  let sensitivity = 0.5;
  if (most_freq_fr > 200) sensitivity = 1;

  const isTuned =
    typeof activeStringFr === 'number'
      ? Math.abs(most_freq_fr - activeStringFr) <= sensitivity
      : false;

  // tip text calculation
  let tipText = 'lower';

  if (typeof activeStringFr === 'number' && most_freq_fr < activeStringFr)
    tipText = 'higher';
  if (isTuned) tipText = 'in tune';
  // ==========

  return (
    <div className={`dial__indicator-cont ${isTuned && 'active'}`}>
      <div className='dial__indicator'>
        {value}
        {value % 1 ? '' : '.0'}
        <span>Hz</span>
      </div>
      <div className='dial__indicator-tip'>{tipText}</div>
    </div>
  );
};

export default Indicator;
