import React from 'react';

interface OwnProps {
  deg: number;
}

type Props = OwnProps;

const Notch: React.FC<Props> = ({ deg }) => {
  let style = { transform: `rotate(${deg * 1.5}deg)` };
  let isBig = !((deg * 1.5) % 7.5);

  return (
    <div className={`dial__notch-cont ${isBig && 'big'}`} style={style}>
      <div className="dial__notch"></div>
    </div>
  );
};

export default Notch;
