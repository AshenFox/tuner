import React from "react";
import Fr from "./Fr";
import Notch from "./Notch";
import Note from "./Note";

const Dial = (props) => {
  return (
    <div className="dial">
      <div className="dial__inner">
        {/* NOTCHES */}
        <Notch />
        {/* FREQUENCIES */}
        <Fr />
        {/* NOTES */}
        <Note />
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
