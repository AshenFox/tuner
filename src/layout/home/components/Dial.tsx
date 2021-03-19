import React, { useState, useEffect } from 'react';
import ml5 from 'ml5';
import Fr from './Fr';
import Notch from './Notch';
import Note from './Note';

const Dial = (props: any) => {
  const [deg, setDeg] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);

  useEffect(() => {
    // setup();
  }, []);

  useEffect(() => {
    /* console.log(deg); */
  }, [deg]);

  // ==============================

  async function setup() {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    audioContext = new AudioContext();
    startPitch(stream, audioContext);
  }

  function startPitch(stream: any, audioContext: any) {
    pitch = ml5.pitchDetection('./model', audioContext, stream, modelLoaded); // modelLoaded
  }

  function modelLoaded() {
    console.log('Model Loaded');
    getPitch();
  }

  function getPitch() {
    pitch.getPitch(function (err: Error, pitch: number) {
      if (pitch) {
        const i = Math.round(Math.log2(Math.round(pitch) / concertPitch) * 12);
        let steps = Math.abs(i);
        let dir = Math.sign(i) >= 0;

        const closest_note = allNotes[(dir ? i : (i % 12) + 12) % 12];
        const closest_pitch = Math.round(concertPitch * 2 ** (i / 12));

        const octave = 4 + Math.sign(i) * Math.floor((steps + (dir ? 9 : 2)) / 12);

        // console.log('pitch', pitch);
        /* setDeg(pitch * 1.5); */
        setDeg((deg) => [...deg.filter((el, i) => i !== 0), pitch]);
      }
      getPitch();
    });
  }

  // =================================

  let notches = [];
  let frs = [];

  for (let i = 0; i < 240; i++) {
    let isBig = !((i * 1.5) % 7.5);

    notches.push(<Notch key={i} deg={i} />);
    if (isBig) frs.push(<Fr key={i} deg={i} number={frs.length + 1} />);
  }

  let style = {
    transform: `translate(-50%, -50%) rotate(${-getMostFrequent(deg) * 1.5}deg)`,
  };

  return (
    <div className='dial'>
      <div className='dial__inner' style={style}>
        {/* NOTCHES */}
        {notches}
        {/* FREQUENCIES */}
        {frs}
        {/* NOTES */}
        {/* <Note /> */}
      </div>
      <div className='dial__housing'>
        <div className='dial__housing-bottom'></div>
      </div>
      <div className='dial__center'></div>
      <div className='dial__hand-cont'>
        <div className='dial__hand'></div>
      </div>
    </div>
  );
};

export default Dial;

let audioContext;
let mic;
let pitch: any;
let stream;

const concertPitch = 440;
const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

let i = Math.round(Math.log2(Math.round(523.25) / concertPitch) * 12);
let steps = Math.abs(i);
let dir = Math.sign(i) >= 0;

///

let arr = [
  73.16887245627998,
  73.16887245627998,
  73.16887245627998,
  73.16887245627998,
  73.11334451080471,
  73.11334451080471,
  73.11334451080471,
  73.11334451080471,
  73.11334451080471,
  73.1379397715822,
  73.1379397715822,
  73.1379397715822,
  73.1379397715822,
  73.1379397715822,
  73.15798050785062,
  73.15798050785062,
  73.15798050785062,
  73.15798050785062,
  73.09373862286938,
  73.09373862286938,
  73.09373862286938,
  73.09373862286938,
  73.09373862286938,
  146.28365242718797,
  146.28365242718797,
  146.28365242718797,
  146.28365242718797,
  73.04628746315598,
  73.04628746315598,
  73.04628746315598,
  73.04628746315598,
  73.04628746315598,
  146.6576435303269,
  146.6576435303269,
  146.4352376845468,
  146.4352376845468,
  146.4352376845468,
  146.4352376845468,
  146.4352376845468,
  145.7967632202069,
  145.7967632202069,
  145.7967632202069,
  145.7967632202069,
  145.80746537163128,
  145.80746537163128,
  145.80746537163128,
  145.93126358500623,
];

/* const getMostFrequent = (arr: number[]) => {
  const sortedArr = arr.sort((a, b) => a - b);

  let maxOccur: number = 0;
  let maxNumber: number | null = null;

  let occur: number = 0;
  let rounded: number | null = null;


  sortedArr.map((el, i) => {
    if (rounded !== Math.floor(el)) {
      rounded = Math.floor(el);
      occur = 1;
    } else {
      ++occur;

      if (occur >= maxOccur) {
        maxOccur = occur;
        maxNumber = rounded;
      }
    }
  });

  console.log(maxOccur, maxNumber);
}; */

const getMostFrequent = (arr: number[]) => {
  let compare = '';
  let mostFreq = 0;

  arr.reduce((acc: any, val) => {
    const floored = Math.floor(val);

    if (floored in acc) {
      // if key already exists
      acc[floored]++; // then increment it by 1
    } else {
      acc[floored] = 1; // or else create a key with value 1
    }
    if (acc[floored] >= compare) {
      // if value of that key is greater
      // than the compare value.
      compare = acc[floored]; // than make it a new compare value.
      mostFreq = val; // also make that key most frequent.
    }

    return acc;
  }, {});

  return mostFreq;
};

console.log(getMostFrequent(arr));
