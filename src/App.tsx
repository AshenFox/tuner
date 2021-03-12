import React from "react";
import ml5 from "ml5";
import { Provider } from "react-redux";
import store from "./store";
import Test from "./components/Test";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <div className="circle">
          <div className="dial">
            {/* NOTCHES */}
            {/* FREQUENCIES */}
            {/* NOTES */}
          </div>
          <div className="housing">
            <div className="housing__bottom"></div>
          </div>
          <div className="center"></div>
          <div className="hand-container">
            <div className="hand"></div>
          </div>
        </div>
        <div className="tuning">
          <div className="tuning__string">
            <span className="tuning__note">E</span>
          </div>
          <div className="tuning__string active">
            <span className="tuning__note">A</span>
          </div>
          <div className="tuning__string">
            <span className="tuning__note">D</span>
          </div>
          <div className="tuning__string">
            <span className="tuning__note">G</span>
          </div>
          <div className="tuning__string">
            <span className="tuning__note">B</span>
          </div>
          <div className="tuning__string">
            <span className="tuning__note">E</span>
          </div>
        </div>
        <div className="pitch-data">
          <h1>Pitch Detection</h1>
          <p id="status">Loading Model...</p>
          <p id="pitch">pitch: 0</p>
          <p id="octave">octave: 0</p>
          <p id="closest_note">closest_note: 0</p>
          <p id="closest_pitch">closest_pitch: 0</p>
        </div>
      </div>
    </Provider>
  );
}

export default App;

/* 
let audioContext;
let mic;
let pitch: any;
let stream;

async function setup() {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  audioContext = new AudioContext();
  startPitch(stream, audioContext);
}

setup();

function startPitch(stream: any, audioContext: any) {
  pitch = ml5.pitchDetection("./model", audioContext, stream, modelLoaded); // modelLoaded
}

function modelLoaded() {
  (document.querySelector("#status") as HTMLParagraphElement).textContent =
    "Model Loaded";
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

      (document.querySelector(
        "#pitch"
      ) as HTMLParagraphElement).textContent = `pitch: ${Math.round(
        pitch
      )}Hz`;
      (document.querySelector(
        "#octave"
      ) as HTMLParagraphElement).textContent = `octave: ${octave}`;
      (document.querySelector(
        "#closest_note"
      ) as HTMLParagraphElement).textContent = `closest_note: ${closest_note}`;
      (document.querySelector(
        "#closest_pitch"
      ) as HTMLParagraphElement).textContent = `closest_pitch: ${closest_pitch}`;
    }
    getPitch();
  });
}

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
 */

// ==============================
// ==============================
// ==============================

/* console.log('i', i);
console.log('Octave', 4 + Math.sign(i) * Math.floor((steps + (dir ? 9 : 2)) / 12));
console.log('Note', allNotes[(dir ? i : (i % 12) + 12) % 12]); */

/* 

CONCERT_PITCH = 440
ALL_NOTES = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
def find_closest_note(pitch):
  i = int( np.round( np.log2( pitch/CONCERT_PITCH )*12 ) )
  closest_note = ALL_NOTES[i%12] + str(4 + np.sign(i) * int((9+abs(i))/12) )
  closest_pitch = CONCERT_PITCH*2**(i/12)
  return closest_note, closest_pitchs

*/
