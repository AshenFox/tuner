import { memo } from 'react';

type NotchProps = {
  deg: number;
};

const Notch = ({ deg }: NotchProps) => {
  const style = { transform: `rotate(${deg * 1.5}deg)` };
  const isBig = !((deg * 1.5) % 7.5);

  return (
    <div className={`dial__notch-cont ${isBig && 'big'}`} style={style}>
      <div className="dial__notch"></div>
    </div>
  );
};

export default memo(Notch);
