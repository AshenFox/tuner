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

  let k = 10;

  const { n_crude } = calcValues(deg, k, most_freq_fr);

  if (n_crude >= 2) k = 5;
  if (n_crude >= 8) k = 1;
  if (n_crude >= 40) k = 0.5;

  const { value, n: n_k } = calcValues(deg, k, most_freq_fr);

  /* console.log(`deg: ${deg}`, `n_crude: ${n_crude}`, `n_k: ${n_k}`, value); */

  return (
    <div className='dial__fr-cont' style={style}>
      {/* <span className="dial__fr">{n_k > 4 ? value : value_k}</span> */}
      <span className='dial__fr'>{value}</span>
      {/* <span className='dial__deg-test'>{deg}</span> */}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Fr);

const calcValues = (deg: number, k: number, fr: number) => {
  // let modif = 0;

  // if (k <= 1) modif = -48;

  // const deg_k = (deg + modif) / k;
  const deg_k = deg / k;
  const offset = deg_k - 120 / k;
  const n_crude = (fr - offset - 0.01) / (240 / k);
  const n = Math.floor(n_crude);
  const value = deg_k + (240 / k) * n;

  return {
    deg_k,
    offset,
    n_crude,
    n,
    value,
  };
};

/* let k = 1;
  if (most_freq_fr + deg - 120 <= 240) k = 5;
  */

/* const offset = deg - 120;
  const n_crude = (most_freq_fr - offset - 0.01) / 240;

  let k = 5;
  if (n_crude >= 1) k = 1;

  const value = deg / k + Math.round((240 / k) * n_crude);
 */

/* console.log(
    "most_freq_fr + deg - 120",
    most_freq_fr + deg - 120,
    "value",
    value
  ); */

/* let k = 1;

  if (most_freq_fr - offset < 100) k = 5; */

/* 

const n = Math.floor((most_freq_fr - offset - 0.01) / 240);

  const value = deg + 240 * n;

  

  let k = 5;
  const deg_k = deg / k;
  const offset_k = deg_k - 120 / 5;
  const n_k = Math.floor((most_freq_fr - offset_k - 0.01) / (240 / k));
  const value_k = deg_k + (240 / k) * n_k;

*/

/* console.log("------------");
  console.log("------------");

  console.log("deg", deg);
  console.log("offset", offset);
  console.log("n", n);
  console.log("value", value);

  console.log("------------"); */

/* console.log("deg_k", deg_k);
  console.log("offset_k", offset_k);
  console.log("n_k", n_k);
  console.log("value_k", value_k);

  console.log("------------");
  console.log("------------"); */
