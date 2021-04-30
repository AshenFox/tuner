import React from "react";
import Fr from "./Fr";
import Notch from "./Notch";
import Note from "./Note";
import { connect } from "react-redux";
import { AppState } from "../../../../store/store";
import Indicator from "./Indicator";

const notchesNum = 240;

const notches = [...new Array(notchesNum)].map((_, i) => (
  <Notch key={i} deg={i} />
));
const frs = [...new Array(notchesNum / 5)].map((_, i) => (
  <Fr key={i * 5} deg={i * 5} />
));

interface StateProps {
  main: { most_freq_fr: number };
}

type Props = StateProps;

const Dial: React.FC<Props> = ({ main }) => {
  /* console.log(notches.length, frs.length); */
  const { most_freq_fr } = main;

  console.log(most_freq_fr);

  let k5_value = 0;
  let k_value = 0;

  if (most_freq_fr > 0) {
    k5_value = most_freq_fr - 240 > 0 ? 240 : most_freq_fr;

    let k = most_freq_fr - 240;
    k_value = k > 0 ? k : 0;

    /* console.log(k5_value, k_value); */
  }

  const style = {
    transform: `translate(-50%, -50%) rotate(${
      -k5_value * 1.5 * 5 - k_value * 1.5
    }deg)`,
  };

  /* const style = {
    transform: `translate(-50%, -50%) rotate(${-most_freq_fr * 1.5}deg)`,
  }; */

  return (
    <div className="dial__container">
      <div className="dial">
        <div className="dial__inner" style={style}>
          {/* NOTCHES */}
          {notches}
          {/* FREQUENCIES */}
          {frs}
          {/* NOTES */}
          {/* <Note /> */}
        </div>
        <div className="dial__housing">
          <div className="dial__housing-bottom"></div>
        </div>
        <div className="dial__center"></div>
        <div className="dial__hand-cont">
          <div className="dial__hand"></div>
        </div>

        <div className="dial__background-top"></div>
        <div className="dial__background-bottom"></div>
        <Indicator />
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
