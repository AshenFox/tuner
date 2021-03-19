import React from "react";
import Fr from "./Fr";
import Notch from "./Notch";
import Note from "./Note";

const Dial = () => {
  let notches = [];
  let frs = [];

  for (let i = 0; i < 240; i++) {
    let isBig = !((i * 1.5) % 7.5);

    notches.push(<Notch key={i} deg={i} />);
    if (isBig) frs.push(<Fr key={i} deg={i} number={frs.length + 1} />);
  }

  let style = {
    transform: `translate(-50%, -50%) rotate(${-0 * 1.5}deg)`,
  };

  return (
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
    </div>
  );
};

export default Dial;
