import React, { memo } from "react";
import { connect } from "react-redux";
import { AppState } from "../../../../store/store";

interface OwnProps {
  deg: number;
}

interface StateProps {
  main: { most_freq_fr: number };
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Fr: React.FC<Props> = memo(({ main, deg }) => {
  const { most_freq_fr } = main;

  const style = { transform: `rotate(${deg * 1.5}deg)` };

  let position = deg;

  let k = 10;

  // console.log("==========");

  let value = calcValues(deg, position, k, most_freq_fr, 0);

  if (value > 48) {
    position = ((value - 48) % (240 / k)) * 10;
    k = 5;
    value = calcValues(deg, position, k, most_freq_fr, 48);
  }

  if (value > 60) {
    position = ((value - 60) % (240 / k)) * 5;
    k = 2.5;
    value = calcValues(deg, position, k, most_freq_fr, 60);
  }

  if (value > 200) {
    position = ((value - 200) % (240 / k)) * 2.5;
    k = 1;
    value = calcValues(deg, position, k, most_freq_fr, 200);
  }

  if (value > 720) {
    position = (value - 720) % (240 / k);
    k = 0.5;
    value = calcValues(deg, position, k, most_freq_fr, 720);
  }

  // console.log("==========");

  return (
    <div className="dial__fr-cont" style={style}>
      {/* <span className="dial__fr">{n_k > 4 ? value : value_k}</span> */}
      <span className="dial__fr">{value}</span>
      {/* <span className="dial__deg-test">{deg}</span> */}
    </div>
  );
});

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Fr);

const calcValues = (
  deg: number,
  position: number,
  k: number,
  fr: number,
  fr_offset: number = 0,
  show: boolean = false
) => {
  const offset = position / k - 120 / k;
  let n = Math.floor((fr - fr_offset - offset - 0.01) / (240 / k));

  // console.log({ deg, n, k });

  if (k === 10 && fr > 48 && fr < 60 && deg >= 180) {
    n = 1;
    k = 10;
  }

  if (k === 5 && fr > 60 && fr < 84 && deg <= 60) {
    n = 0;
    k = 5;
  }

  if (k === 2.5 && fr > 200 && fr < 260 && deg >= 110 && deg <= 170) {
    n = 1;
    k = 2.5;

    //(deg <= 20 || deg >= 200)
  }

  if (k === 1 && fr > 720 && fr < 840 && deg >= 60 && deg <= 120) {
    n = 2;
    k = 1;
  }

  const value = position / k + (240 / k) * n + fr_offset;

  /* if ((deg >= 0 && deg <= 20) || (deg >= 200 && deg <= 240)) {
    // console.log({ deg, value, n, k, position });
  } */

  return value;
};

// ============================================
// ============================================
// ============================================
// ============================================
// ============================================
// ============================================
// ============================================
// ============================================
// ============================================
// ============================================
// ============================================

/* 

import React, { memo } from 'react';
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

const Fr: React.FC<Props> = memo(({ main, deg }) => {
  const { most_freq_fr } = main;

  const style = { transform: `rotate(${deg * 1.5}deg)` };

  let k = 10;
  // console.log('============');

  const { n_crude, offset } = calcValues(deg, k, most_freq_fr);

  if (n_crude >= 2) k = 5;
  if (n_crude >= 10) k = 1;
  if (n_crude >= 40) k = 0.5;

  let { value, n } = calcValues(deg, k, most_freq_fr);

  // console.log('============');

  //Number(n_crude.toFixed(2))

  return (
    <div className='dial__fr-cont' style={style}>
      {<span className="dial__fr">{n_k > 4 ? value : value_k}</span> }
      <span className='dial__fr'>{value}</span>
      <span className='dial__deg-test'>{deg}</span>
    </div>
  );
});

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Fr);

const calcValues = (deg: number, k: number, fr: number) => {
  const offset = deg / k - 120 / k;
  const n_crude = (fr - offset - 0.01) / (240 / k);
  let n = Math.floor(n_crude);

   if (fr > 48 && fr < 60 && deg > 120 && deg < 240) {
    n = 1;
    k = 10;
  }

  if (fr > 240 && fr < 300 && deg > 120 && deg < 240) {
    n = 4;
    k = 5;
  }

  if (fr > 960 && fr < 1080 && deg > 120 && deg < 240) {
    n = 3;
    k = 1;
  } 

  const value = deg / k + (240 / k) * n;

   console.log(
    `deg: ${deg}`,
    `k: ${k}`,
    `fr: ${fr}`,
    `offset: ${offset}`,
    `n_crude: ${n_crude}`,
    `n: ${n}`,
    `value: ${value}`
  ); 

  return {
    offset,
    n_crude,
    n,
    value,
  };
};




*/

let v = 190;

if ((v > 0 && v < 60) || (v > 180 && v < 240)) {
  console.log(true);
}
