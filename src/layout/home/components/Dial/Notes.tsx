import React from "react";
import Note from "./Note";
import { connect } from "react-redux";
import { AppState } from "../../../../store/store";

interface OwnProps {}

interface StateProps {
  main: { most_freq_fr: number };
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Notes: React.FC<Props> = ({ main }) => {
  const { most_freq_fr } = main;

  //   12*Math.log2(440/16.351597831287414)

  //16.351597831287414*(2 ** (71/12))

  const steps = 12 * Math.log2(most_freq_fr / baseFR);

  // 24
  // 120
  // 240

  const closest = Math.floor(steps);

  const notesArr = [];

  let offsetUp = 3;
  let offestDown = 3;

  if (most_freq_fr > 150) {
    offestDown = 2;
    offsetUp = 2;
  }

  if (most_freq_fr > 220) offsetUp = 4;

  for (let z = closest - offestDown; z < closest + offsetUp; z++) {
    /* const i = (z + 1) % 12;
    const { name, sign } = notesValuesArr[i];
    const octave = Math.floor(35 / 12);
    const fr = baseFR * 2 ** ((z + 1) / 12);

    const angle = calcAngle(fr);

    notesArr.push({ name, sign, octave, fr, angle }); */
  }

  /* console.log(notesArr); */

  /* ===========
  
  const i = (steps + 1) % 12;
    const {name, sign} = notesValuesArr[i];
    const octave = Math.floor(35/12);
    const fr = baseFR*(2 ** (steps/12)) 
  
  =========== */

  //   console.log(steps);

  return (
    <>
      {/* {notesArr.map((data) => (
        <Note data={data} />
      ))} */}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Notes);

const baseFR = 16.351597831287414;

const notesValuesArr = [
  {
    name: "C",
    sign: false,
  },
  {
    name: "C",
    sign: true,
  },
  {
    name: "D",
    sign: false,
  },
  {
    name: "D",
    sign: true,
  },
  {
    name: "E",
    sign: false,
  },
  {
    name: "F",
    sign: false,
  },
  {
    name: "F",
    sign: true,
  },
  {
    name: "G",
    sign: false,
  },
  {
    name: "G",
    sign: true,
  },
  {
    name: "A",
    sign: false,
  },
  {
    name: "A",
    sign: true,
  },
  {
    name: "B",
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
  { max: 192, k: 5 },
  { max: 720, k: 1 },
];

/* (() => {
  const table = document.querySelector('center center table');

  let values = [...table.querySelectorAll('tr')].map((el) => {
    let children = [...el.querySelectorAll('td')];
    if(!children.length) return;

    let note = children[0].firstChild.textContent.trim()
    // let note = el.firstChild;
    let sign = children[0].querySelector('sup') ? children[0].querySelector('sup').textContent.trim() : false;
    let octave = parseFloat(children[0].querySelector('sub').textContent.trim());
    let ft = parseFloat(children[1].textContent.trim());
    return { note,sign, octave,ft };
  });

  return values;
})(); */

/* const allNotes = [
  {
    note: 'C',
    sign: false,
    octave: 0,
    ft: 16.35,
  },
  {
    note: 'C',
    sign: '#',
    octave: 0,
    ft: 17.32,
  },
  {
    note: 'D',
    sign: false,
    octave: 0,
    ft: 18.35,
  },
  {
    note: 'D',
    sign: '#',
    octave: 0,
    ft: 19.45,
  },
  {
    note: 'E',
    sign: false,
    octave: 0,
    ft: 20.6,
  },
  {
    note: 'F',
    sign: false,
    octave: 0,
    ft: 21.83,
  },
  {
    note: 'F',
    sign: '#',
    octave: 0,
    ft: 23.12,
  },
  {
    note: 'G',
    sign: false,
    octave: 0,
    ft: 24.5,
  },
  {
    note: 'G',
    sign: '#',
    octave: 0,
    ft: 25.96,
  },
  {
    note: 'A',
    sign: false,
    octave: 0,
    ft: 27.5,
  },
  {
    note: 'A',
    sign: '#',
    octave: 0,
    ft: 29.14,
  },
  {
    note: 'B',
    sign: false,
    octave: 0,
    ft: 30.87,
  },
  {
    note: 'C',
    sign: false,
    octave: 1,
    ft: 32.7,
  },
  {
    note: 'C',
    sign: '#',
    octave: 1,
    ft: 34.65,
  },
  {
    note: 'D',
    sign: false,
    octave: 1,
    ft: 36.71,
  },
  {
    note: 'D',
    sign: '#',
    octave: 1,
    ft: 38.89,
  },
  {
    note: 'E',
    sign: false,
    octave: 1,
    ft: 41.2,
  },
  {
    note: 'F',
    sign: false,
    octave: 1,
    ft: 43.65,
  },
  {
    note: 'F',
    sign: '#',
    octave: 1,
    ft: 46.25,
  },
  {
    note: 'G',
    sign: false,
    octave: 1,
    ft: 49,
  },
  {
    note: 'G',
    sign: '#',
    octave: 1,
    ft: 51.91,
  },
  {
    note: 'A',
    sign: false,
    octave: 1,
    ft: 55,
  },
  {
    note: 'A',
    sign: '#',
    octave: 1,
    ft: 58.27,
  },
  {
    note: 'B',
    sign: false,
    octave: 1,
    ft: 61.74,
  },
  {
    note: 'C',
    sign: false,
    octave: 2,
    ft: 65.41,
  },
  {
    note: 'C',
    sign: '#',
    octave: 2,
    ft: 69.3,
  },
  {
    note: 'D',
    sign: false,
    octave: 2,
    ft: 73.42,
  },
  {
    note: 'D',
    sign: '#',
    octave: 2,
    ft: 77.78,
  },
  {
    note: 'E',
    sign: false,
    octave: 2,
    ft: 82.41,
  },
  {
    note: 'F',
    sign: false,
    octave: 2,
    ft: 87.31,
  },
  {
    note: 'F',
    sign: '#',
    octave: 2,
    ft: 92.5,
  },
  {
    note: 'G',
    sign: false,
    octave: 2,
    ft: 98,
  },
  {
    note: 'G',
    sign: '#',
    octave: 2,
    ft: 103.83,
  },
  {
    note: 'A',
    sign: false,
    octave: 2,
    ft: 110,
  },
  {
    note: 'A',
    sign: '#',
    octave: 2,
    ft: 116.54,
  },
  {
    note: 'B',
    sign: false,
    octave: 2,
    ft: 123.47,
  },
  {
    note: 'C',
    sign: false,
    octave: 3,
    ft: 130.81,
  },
  {
    note: 'C',
    sign: '#',
    octave: 3,
    ft: 138.59,
  },
  {
    note: 'D',
    sign: false,
    octave: 3,
    ft: 146.83,
  },
  {
    note: 'D',
    sign: '#',
    octave: 3,
    ft: 155.56,
  },
  {
    note: 'E',
    sign: false,
    octave: 3,
    ft: 164.81,
  },
  {
    note: 'F',
    sign: false,
    octave: 3,
    ft: 174.61,
  },
  {
    note: 'F',
    sign: '#',
    octave: 3,
    ft: 185,
  },
  {
    note: 'G',
    sign: false,
    octave: 3,
    ft: 196,
  },
  {
    note: 'G',
    sign: '#',
    octave: 3,
    ft: 207.65,
  },
  {
    note: 'A',
    sign: false,
    octave: 3,
    ft: 220,
  },
  {
    note: 'A',
    sign: '#',
    octave: 3,
    ft: 233.08,
  },
  {
    note: 'B',
    sign: false,
    octave: 3,
    ft: 246.94,
  },
  {
    note: 'C',
    sign: false,
    octave: 4,
    ft: 261.63,
  },
  {
    note: 'C',
    sign: '#',
    octave: 4,
    ft: 277.18,
  },
  {
    note: 'D',
    sign: false,
    octave: 4,
    ft: 293.66,
  },
  {
    note: 'D',
    sign: '#',
    octave: 4,
    ft: 311.13,
  },
  {
    note: 'E',
    sign: false,
    octave: 4,
    ft: 329.63,
  },
  {
    note: 'F',
    sign: false,
    octave: 4,
    ft: 349.23,
  },
  {
    note: 'F',
    sign: '#',
    octave: 4,
    ft: 369.99,
  },
  {
    note: 'G',
    sign: false,
    octave: 4,
    ft: 392,
  },
  {
    note: 'G',
    sign: '#',
    octave: 4,
    ft: 415.3,
  },
  {
    note: 'A',
    sign: false,
    octave: 4,
    ft: 440,
  },
  {
    note: 'A',
    sign: '#',
    octave: 4,
    ft: 466.16,
  },
  {
    note: 'B',
    sign: false,
    octave: 4,
    ft: 493.88,
  },
  {
    note: 'C',
    sign: false,
    octave: 5,
    ft: 523.25,
  },
  {
    note: 'C',
    sign: '#',
    octave: 5,
    ft: 554.37,
  },
  {
    note: 'D',
    sign: false,
    octave: 5,
    ft: 587.33,
  },
  {
    note: 'D',
    sign: '#',
    octave: 5,
    ft: 622.25,
  },
  {
    note: 'E',
    sign: false,
    octave: 5,
    ft: 659.25,
  },
  {
    note: 'F',
    sign: false,
    octave: 5,
    ft: 698.46,
  },
  {
    note: 'F',
    sign: '#',
    octave: 5,
    ft: 739.99,
  },
  {
    note: 'G',
    sign: false,
    octave: 5,
    ft: 783.99,
  },
  {
    note: 'G',
    sign: '#',
    octave: 5,
    ft: 830.61,
  },
  {
    note: 'A',
    sign: false,
    octave: 5,
    ft: 880,
  },
  {
    note: 'A',
    sign: '#',
    octave: 5,
    ft: 932.33,
  },
  {
    note: 'B',
    sign: false,
    octave: 5,
    ft: 987.77,
  },
  {
    note: 'C',
    sign: false,
    octave: 6,
    ft: 1046.5,
  },
  {
    note: 'C',
    sign: '#',
    octave: 6,
    ft: 1108.73,
  },
  {
    note: 'D',
    sign: false,
    octave: 6,
    ft: 1174.66,
  },
  {
    note: 'D',
    sign: '#',
    octave: 6,
    ft: 1244.51,
  },
  {
    note: 'E',
    sign: false,
    octave: 6,
    ft: 1318.51,
  },
  {
    note: 'F',
    sign: false,
    octave: 6,
    ft: 1396.91,
  },
  {
    note: 'F',
    sign: '#',
    octave: 6,
    ft: 1479.98,
  },
  {
    note: 'G',
    sign: false,
    octave: 6,
    ft: 1567.98,
  },
  {
    note: 'G',
    sign: '#',
    octave: 6,
    ft: 1661.22,
  },
  {
    note: 'A',
    sign: false,
    octave: 6,
    ft: 1760,
  },
  {
    note: 'A',
    sign: '#',
    octave: 6,
    ft: 1864.66,
  },
  {
    note: 'B',
    sign: false,
    octave: 6,
    ft: 1975.53,
  },
  {
    note: 'C',
    sign: false,
    octave: 7,
    ft: 2093,
  },
]; */

// 16.351597831287414*(2 ** (71/12))
// 12*Math.log2(440/16.351597831287414)
/* 
  
    {
      note: 'C',
      sign: '#',
      octave: 7,
      ft: 2217.46,
    },
    {
      note: 'D',
      sign: false,
      octave: 7,
      ft: 2349.32,
    },
    {
      note: 'D',
      sign: '#',
      octave: 7,
      ft: 2489.02,
    },
    {
      note: 'E',
      sign: false,
      octave: 7,
      ft: 2637.02,
    },
    {
      note: 'F',
      sign: false,
      octave: 7,
      ft: 2793.83,
    },
    {
      note: 'F',
      sign: '#',
      octave: 7,
      ft: 2959.96,
    },
    {
      note: 'G',
      sign: false,
      octave: 7,
      ft: 3135.96,
    },
    {
      note: 'G',
      sign: '#',
      octave: 7,
      ft: 3322.44,
    },
    {
      note: 'A',
      sign: false,
      octave: 7,
      ft: 3520,
    },
    {
      note: 'A',
      sign: '#',
      octave: 7,
      ft: 3729.31,
    },
    {
      note: 'B',
      sign: false,
      octave: 7,
      ft: 3951.07,
    },
    {
      note: 'C',
      sign: false,
      octave: 8,
      ft: 4186.01,
    },
    {
      note: 'C',
      sign: '#',
      octave: 8,
      ft: 4434.92,
    },
    {
      note: 'D',
      sign: false,
      octave: 8,
      ft: 4698.63,
    },
    {
      note: 'D',
      sign: '#',
      octave: 8,
      ft: 4978.03,
    },
    {
      note: 'E',
      sign: false,
      octave: 8,
      ft: 5274.04,
    },
    {
      note: 'F',
      sign: false,
      octave: 8,
      ft: 5587.65,
    },
    {
      note: 'F',
      sign: '#',
      octave: 8,
      ft: 5919.91,
    },
    {
      note: 'G',
      sign: false,
      octave: 8,
      ft: 6271.93,
    },
    {
      note: 'G',
      sign: '#',
      octave: 8,
      ft: 6644.88,
    },
    {
      note: 'A',
      sign: false,
      octave: 8,
      ft: 7040,
    },
    {
      note: 'A',
      sign: '#',
      octave: 8,
      ft: 7458.62,
    },
    {
      note: 'B',
      sign: false,
      octave: 8,
      ft: 7902.13,
    },
  
  */