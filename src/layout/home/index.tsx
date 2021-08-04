import React from 'react';
import Dial from './components/Dial';
import PitchDetector from '../../utilities/PitchDetectorComponent';
import Tuning from './components/Tuning';
import TuningSelect from './components/TuningSelect';

interface OwnProps {}

type Props = OwnProps;

const Home: React.FC<Props> = (props) => {
  return (
    <div className='home'>
      <div className='container'>
        <Dial />
        <TuningSelect />
        <Tuning />
        <PitchDetector />
      </div>
    </div>
  );
};

export default Home;
