import React from 'react';
import Dial from './components/Dial';
import PitchDetector from './components/PitchDetector';
import Tuning from './components/Tuning';
import Indicator from './components/Indicator';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Home = (props: Props) => {
  return (
    <div className='container'>
      <Dial />
      <Indicator />
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
