import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { set_fr } from "../../../store/actions/mainActions";
import ml5 from "ml5";
import { AppState } from "../../../store/store";

interface OwnProps {}

interface DispatchProps {
  set_fr: typeof set_fr;
}

type Props = DispatchProps & OwnProps;

const PitchDetector: React.FC<Props> = ({ set_fr }) => {
  useEffect(() => {
    // Initiate pitch detection
    /* setup(); */
  }, []);

  // Declare functions

  // ==============================
  // ==============================
  // ==============================

  const setup = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    audioContext = new AudioContext();
    startPitch(stream, audioContext);
  };

  const startPitch = (stream: any, audioContext: any) => {
    pitchDetection = ml5.pitchDetection(
      "./model",
      audioContext,
      stream,
      modelLoaded
    );
  };

  const modelLoaded = () => {
    console.log("Model Loaded");
    getPitch();
  };

  const getPitch = () => {
    pitchDetection.getPitch(function (err: Error, fr: number) {
      if (fr) {
        const i = Math.round(
          Math.log2(Math.round(fr) / concertPitch) * 12
        );
        let steps = Math.abs(i);
        let dir = Math.sign(i) >= 0;

        const closest_note = allNotes[(dir ? i : (i % 12) + 12) % 12];
        const closest_pitch = Math.round(concertPitch * 2 ** (i / 12));

        const octave =
          4 + Math.sign(i) * Math.floor((steps + (dir ? 9 : 2)) / 12);

        /* set_pitch_arr((pitch_arr) => [...pitch_arr.filter((el, i) => i !== 0), fr]); */
        set_fr(fr);
      }
      getPitch();
    });
  };

  // ==============================
  // ==============================
  // ==============================

  return <></>;
};

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps, {
  set_fr,
})(PitchDetector);

// =====================================
// =====================================
// =====================================

const getMostFrequent = (arr: number[]) => {
  let compare = "";
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

let mic; // ????
let audioContext: AudioContext;
let pitchDetection: any;
let stream: MediaStream;

const concertPitch = 440;
const allNotes = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

let i = Math.round(Math.log2(Math.round(523.25) / concertPitch) * 12);
let steps = Math.abs(i);
let dir = Math.sign(i) >= 0;

///

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
