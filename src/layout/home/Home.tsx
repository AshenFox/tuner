import { memo } from 'react';
import Dial from './components/Dial';
import PitchDetector from '@utilities/PitchDetectorComponent';
import Tuning from './components/Tuning';
import TuningSelect from './components/TuningSelect';

const Home = () => {
  return (
    <div className="page home">
      <div className="container">
        <Dial />
        <TuningSelect />
        <Tuning />
        <PitchDetector />
      </div>
    </div>
  );
};

export default memo(Home);
