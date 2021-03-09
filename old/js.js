let audioContext;
let mic;
let pitch;

async function setup() {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  audioContext = new AudioContext();
  startPitch(stream, audioContext);
}

setup();

function startPitch(stream, audioContext) {
  pitch = ml5.pitchDetection("./model", audioContext, stream, modelLoaded);
}

function modelLoaded() {
  document.querySelector("#status").textContent = "Model Loaded";
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, pitch) {
    if (pitch) {
      const i = Math.round(Math.log2(Math.round(pitch) / concertPitch) * 12);
      let steps = Math.abs(i);
      let dir = Math.sign(i) >= 0;

      const closest_note = allNotes[(dir ? i : (i % 12) + 12) % 12];
      const closest_pitch = Math.round(concertPitch * 2 ** (i / 12));

      const octave =
        4 + Math.sign(i) * Math.floor((steps + (dir ? 9 : 2)) / 12);

      /* document.querySelector('#pitch').textContent = `pitch: ${Math.round(pitch)}Hz`;
      document.querySelector('#octave').textContent = `octave: ${octave}`;
      document.querySelector(
        '#closest_note'
      ).textContent = `closest_note: ${closest_note}`;
      document.querySelector(
        '#closest_pitch'
      ).textContent = `closest_pitch: ${closest_pitch}`; */
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
