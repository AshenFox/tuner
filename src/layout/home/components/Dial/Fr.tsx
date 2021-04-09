import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../store/store';

interface OwnProps {
  deg: number;
}

interface StateProps {
  main: { most_freq_fr: number };
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Fr: React.FC<Props> = ({ main, deg }) => {
  const { most_freq_fr } = main;

  const style = { transform: `rotate(${deg * 1.5}deg)` };

  const offset = deg - 120;
  const n = Math.floor((most_freq_fr - offset - 0.01) / 240);

  // console.log('initNum', initNum);
  // console.log('------------');
  // console.log('full circles', Math.ceil(detected_FR / 240));
  // console.log('------------');

  return (
    <div className='dial__fr-cont' style={style}>
      <span className='dial__fr'>{deg + 240 * n}</span>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Fr);
