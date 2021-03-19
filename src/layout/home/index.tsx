import React from "react";
import Dial from "./components/Dial";
import PitchDetector from "./components/PitchDetector";
import Tuning from "./components/Tuning";

const Home = (props: any) => {
  return (
    <div className="container">
      <Dial />
      <Tuning />
      <PitchDetector />
    </div>
  );
};

export default Home;

/* <div className="pitch-data">
<h1>Pitch Detection</h1>
<p id="status">Loading Model...</p>
<p id="pitch">pitch: 0</p>
<p id="octave">octave: 0</p>
<p id="closest_note">closest_note: 0</p>
<p id="closest_pitch">closest_pitch: 0</p>
</div> */
