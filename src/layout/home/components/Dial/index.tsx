import React from 'react';
import Fr from './Fr';
import Notch from './Notch';
import Note from './Note';
import { connect } from 'react-redux';
import { AppState } from '../../../../store/store';

const notchesNum = 240;

const notches = [...new Array(notchesNum)].map((_, i) => <Notch key={i} deg={i} />);
const frs = [...new Array(notchesNum / 5)].map((_, i) => <Fr key={i * 5} deg={i * 5} />);

interface StateProps {
  main: { most_freq_fr: number };
}

type Props = StateProps;

const Dial = ({ main }: { main: { most_freq_fr: number } }) => {
  /* console.log(notches.length, frs.length); */
  const { most_freq_fr } = main;

  const style = {
    transform: `translate(-50%, -50%) rotate(${-most_freq_fr * 1.5}deg)`,
  };

  return (
    <div className='dial'>
      <div className='dial__inner' style={style}>
        {/* NOTCHES */}
        {notches}
        {/* FREQUENCIES */}
        {frs}
        {/* NOTES */}
        {/* <Note /> */}
      </div>
      <div className='dial__housing'>
        <div className='dial__housing-bottom'></div>
      </div>
      <div className='dial__center'></div>
      <div className='dial__hand-cont'>
        <div className='dial__hand'></div>
      </div>
    </div>
  );
};

/* let notches = [];
  let frs = [];

  for (let i = 0; i < 240; i++) {
    let isBig = !((i * 1.5) % 7.5);

    notches.push(<Notch key={i} deg={i} />);
    if (isBig) frs.push(<Fr key={i} deg={i} number={frs.length + 1} />);
  } */

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Dial);