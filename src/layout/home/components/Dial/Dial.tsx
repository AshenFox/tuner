import { memo } from 'react';
import { useAppSelector } from '@store/hooks';
import calcAngle from '@utilities/dialScale';
import Indicator from './Indicator';
import Notes from './Notes';
import Frs from './Frs';
import Notches from './Notches/Notches';

const notchesNum = 240;

const Dial = () => {
  const most_freq_fr = useAppSelector(s => s.main.most_freq_fr);
  const tunings = useAppSelector(s => s.main.tunings);
  const active_note_id = useAppSelector(s => s.main.active_note_id);
  const active_tuning_id = useAppSelector(s => s.main.active_tuning_id);

  const activeTuning = tunings.find(({ id }) => id === active_tuning_id);
  const activeStringFr = activeTuning?.data.find(
    ({ id }) => id === active_note_id
  )?.fr;

  const angle = calcAngle(most_freq_fr);

  const style = {
    transform: `translate(-50%, -50%) rotate(${-angle * 1.5}deg)`,
  };

  let sensitivity = 0.5;
  if (most_freq_fr > 200) sensitivity = 1;

  const isTuned =
    typeof activeStringFr === 'number'
      ? Math.abs(most_freq_fr - activeStringFr) <= sensitivity
      : false;

  return (
    <div className="dial__container">
      <div className="dial">
        <div className="dial__inner" style={style}>
          <Notches num={notchesNum} />
          <Frs num={notchesNum} />
          <Notes fr={most_freq_fr} />
        </div>
        <div className="dial__housing">
          <div className="dial__housing-bottom" />
        </div>
        <div className={`dial__center ${isTuned && 'active'}`} />
        <div className={`dial__hand-cont ${isTuned && 'active'}`}>
          <div className="dial__hand1" />
          <div className="dial__hand2" />
        </div>

        <div className="dial__background-top" />
        <div className="dial__background-bottom" />
        <Indicator />
      </div>
    </div>
  );
};

export default memo(Dial);
