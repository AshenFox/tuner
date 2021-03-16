import React from "react";

const Fr = ({ number, deg }) => {
  let style = { transform: `rotate(${deg * 1.5}deg)` };

  /* console.log(deg * 1.5, -5 + number * 5); */

  return (
    <div className="dial__fr-cont" style={style}>
      <span className="dial__fr">{-5 + number * 5}</span>
    </div>
  );
};

export default Fr;
