import React, { useState, useEffect } from "react";
import ml5 from "ml5";
import Fr from "./Fr";
import Notch from "./Notch";
import Note from "./Note";

const Dial = (props: any) => {
  const [deg, setDeg] = useState(0);

  useEffect(() => {
    setup();
  }, []);

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
    pitch = ml5.pitchDetection(
      "./model",
      audioContext,
      stream,
      modelLoaded
    ); // modelLoaded
  }

  function modelLoaded() {
    console.log("Model Loaded");
    getPitch();
  }

  function getPitch() {
    pitch.getPitch(function (err: Error, pitch: number) {
      if (pitch) {
        const i = Math.round(
          Math.log2(Math.round(pitch) / concertPitch) * 12
        );
        let steps = Math.abs(i);
        let dir = Math.sign(i) >= 0;

        const closest_note = allNotes[(dir ? i : (i % 12) + 12) % 12];
        const closest_pitch = Math.round(concertPitch * 2 ** (i / 12));

        const octave =
          4 + Math.sign(i) * Math.floor((steps + (dir ? 9 : 2)) / 12);

        /* console.log("pitch", pitch, "deg", pitch * 1.5); */
        setDeg(-pitch * 1.5);
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

  let style = { transform: `translate(-50%, -50%) rotate(${deg}deg)` };

  /* console.log(style); */

  return (
    <div className="dial">
      <div className="dial__inner" style={style}>
        {/* NOTCHES */}
        {notches}
        {/* FREQUENCIES */}
        {frs}
        {/* NOTES */}
        {/* <Note /> */}
      </div>
      <div className="dial__housing">
        <div className="dial__housing-bottom"></div>
      </div>
      <div className="dial__center"></div>
      <div className="dial__hand-cont">
        <div className="dial__hand"></div>
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
