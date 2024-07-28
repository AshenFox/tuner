import React, { memo } from 'react';
import Note from './Note';
interface OwnProps {
  fr: number;
}

type Props = OwnProps;

const Notes: React.FC<Props> = ({ fr }) => {
  // const { most_freq_fr } = main;

  //   12*Math.log2(440/16.351597831287414)

  //16.351597831287414*(2 ** (71/12))

  const steps = 12 * Math.log2(fr / baseFR);

  const closest = Math.floor(steps);

  const notesArr = [];

  let offsetUp = 6;
  let offestDown = 6;

  if (fr >= 300) {
    offsetUp = 4;
    offestDown = 4;
  }

  if (fr >= 1000) {
    offsetUp = 3;
    offestDown = 3;
  }

  if (fr >= 1500) {
    offsetUp = 2;
    offestDown = 2;
  }

  for (let z = closest - offestDown + 1; z < closest + offsetUp; z++) {
    const i = z % 12;

    const octave = Math.floor(z / 12);
    const fr = baseFR * 2 ** (z / 12);

    if (fr < 16.3 || fr > 3000) continue;

    const angle = calcAngle(fr);

    notesArr.push({ ...notesValuesArr[i], octave, fr, angle });
  }

  return (
    <>
      {notesArr.map((data, i) => (
        <Note data={data} key={i} />
      ))}
    </>
  );
};

const areEqual = (prev: Props, current: Props) =>
  Math.floor(prev.fr) === Math.floor(current.fr);

export default memo(Notes, areEqual);

const baseFR = 16.351597831287414;

const notesValuesArr = [
  {
    name: 'C',
    sign: false,
  },
  {
    name: 'C',
    sign: true,
  },
  {
    name: 'D',
    sign: false,
  },
  {
    name: 'D',
    sign: true,
  },
  {
    name: 'E',
    sign: false,
  },
  {
    name: 'F',
    sign: false,
  },
  {
    name: 'F',
    sign: true,
  },
  {
    name: 'G',
    sign: false,
  },
  {
    name: 'G',
    sign: true,
  },
  {
    name: 'A',
    sign: false,
  },
  {
    name: 'A',
    sign: true,
  },
  {
    name: 'B',
    sign: false,
  },
];

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
