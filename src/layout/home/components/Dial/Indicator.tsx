import { memo } from 'react';
import { useAppSelector } from '@store/hooks';

const Indicator = () => {
  const most_freq_fr = useAppSelector(s => s.main.most_freq_fr);
  const tunings = useAppSelector(s => s.main.tunings);
  const language = useAppSelector(s => s.main.settings.language);
  const active_note_id = useAppSelector(s => s.main.active_note_id);
  const active_tuning_id = useAppSelector(s => s.main.active_tuning_id);

  const value: number = Math.round(most_freq_fr * 10) / 10;

  const activeTuning = tunings.find(({ id }) => id === active_tuning_id);
  const activeStringFr = activeTuning?.data.find(
    ({ id }) => id === active_note_id
  )?.fr;

  let sensitivity = 0.5;
  if (most_freq_fr > 200) sensitivity = 1;

  const isTuned =
    typeof activeStringFr === 'number'
      ? Math.abs(most_freq_fr - activeStringFr) <= sensitivity
      : false;

  // tip text calculation
  let tipText = language.main.tips.lower;

  if (typeof activeStringFr === 'number' && most_freq_fr < activeStringFr)
    tipText = language.main.tips.higher;
  if (isTuned) tipText = language.main.tips.in_tune;
  // ==========

  return (
    <div className={`dial__indicator-cont ${isTuned && 'active'}`}>
      <div className="dial__indicator">
        {value}
        {value % 1 ? '' : '.0'}
        <span>Hz</span>
      </div>
      <div className="dial__indicator-tip">{tipText}</div>
    </div>
  );
};

export default memo(Indicator);
