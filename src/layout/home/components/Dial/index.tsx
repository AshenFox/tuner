import { memo } from 'react';
import { useAppSelector } from '@store/hooks';
import Indicator from './Indicator';
import Notes from './Notes';
import Frs from './Frs';
import Notches from './Notches';

const notchesNum = 240;

const Dial = () => {
  const most_freq_fr = useAppSelector(s => s.main.most_freq_fr);
  const tunings = useAppSelector(s => s.main.tunings);

  const activeTuning = tunings.find(tuning => tuning.active);
  const activeStringFr = activeTuning?.data.find(({ active }) => active)?.fr;

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
          <div className="dial__housing-bottom"></div>
        </div>
        <div className={`dial__center ${isTuned && 'active'}`}></div>
        <div className={`dial__hand-cont ${isTuned && 'active'}`}>
          <div className="dial__hand1"></div>
          <div className="dial__hand2"></div>
        </div>

        <div className="dial__background-top"></div>
        <div className="dial__background-bottom"></div>
        <Indicator />
      </div>
    </div>
  );
};

const calcAngle = (fr: number) =>
  degs.reduce((result, deg, i) => {
    if (fr <= 0) return result;

    const { max, k } = deg;

    fr > max ? (result += max * k) : (result += fr * k);

    fr -= max;

    if (i + 1 === degs.length && fr > 0) result += fr * 0.5;
    return result;
  }, 0);

const degs: { max: number; k: number }[] = [
  { max: 48, k: 10 },
  { max: 12, k: 5 },
  { max: 60, k: 2.5 },
  { max: 80, k: 2 },
  { max: 520, k: 1 },
];

export default memo(Dial);
