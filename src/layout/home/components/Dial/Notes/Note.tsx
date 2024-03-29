import React from 'react';

interface OwnProps {
  data: {
    name: string;
    sign: boolean;
    octave: number;
    fr: number;
    angle: number;
  };
}

type Props = OwnProps;

const Note: React.FC<Props> = ({ data }) => {
  const { name, sign, octave, fr, angle } = data;

  const style = {
    transform: `rotate(${angle * 1.5}deg)`,
  };

  return (
    <div className='dial__note-cont' style={style}>
      <div className='dial__note-holder'>
        <span className='dial__note'>{name}</span>
        <div className='dial__note-info'>
          <span className='dial__note-sharp'>{sign && '#'}</span>
          <span className='dial__note-octave'>{octave}</span>
        </div>
      </div>
      <div className='dial__note-fr'>
        {Number(fr.toFixed(1))}
        <span>Hz</span>
      </div>
    </div>
  );
};

export default Note;
