import { memo } from 'react';

type NoteProps = {
  data: {
    name: string;
    sign: boolean;
    octave: number;
    fr: number;
    angle: number;
  };
};

const Note = ({ data }: NoteProps) => {
  const { name, sign, octave, fr, angle } = data;

  const style = {
    transform: `rotate(${angle * 1.5}deg)`,
  };

  // Split the toPrecision string directly so trailing zeros (e.g. "440.0")
  // are preserved and the decimal span renders consistently.
  const [intPart, decPart] = fr.toPrecision(4).split('.');

  return (
    <div className="dial__note-cont" style={style}>
      <div className="dial__note-holder">
        <span className="dial__note">{name}</span>
        <div className="dial__note-info">
          <span className="dial__note-sharp">{sign && '#'}</span>
          <span className="dial__note-octave">{octave}</span>
        </div>
      </div>
      <div className="dial__note-fr">
        <span className="dial__note-fr-int">{intPart}</span>
        {decPart && <span className="dial__note-fr-dec">{`.${decPart}`}</span>}
        <span className="dial__note-fr-unit">Hz</span>
      </div>
    </div>
  );
};

export default memo(Note);
