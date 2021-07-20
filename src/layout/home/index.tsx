import React from 'react';
import Dial from './components/Dial';
import PitchDetector from './components/PitchDetector';
import Tuning from './components/Tuning';
interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Home = (props: Props) => {
  return (
    <div className='home'>
      <div className='container'>
        <Dial />
        <Tuning />
        <PitchDetector />
      </div>
    </div>
  );
};

export default Home;
