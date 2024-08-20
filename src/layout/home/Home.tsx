import { memo } from 'react';
import PitchDetector from '@utilities/PitchDetectorComponent';
import Dial from './components/Dial';
import Tuning from './components/Tuning';
import TuningSelect from './components/TuningSelect';

const Home = () => (
  <div className="page home">
    <div className="container">
      <Dial />
      <TuningSelect />
      <Tuning />
      <PitchDetector />
    </div>
  </div>
);

export default memo(Home);
