import React from "react";
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

const Fr: React.FC<Props> = ({ main, deg }) => {
  const { most_freq_fr } = main;

  const style = { transform: `rotate(${deg * 1.5}deg)` };

  const offset = deg - 120;

  const n = Math.floor((most_freq_fr - offset - 0.01) / 240);

  /* console.log("------------");

  console.log("deg", deg / 5);
  console.log("offset", deg / 5 - 24);
  console.log(
    "n",
    Math.floor((most_freq_fr - (deg / 5 - 24) - 0.01) / 48)
  );
  console.log(
    "value",
    deg / 5 + 48 * Math.floor((most_freq_fr - (deg / 5 - 24) - 0.01) / 48)
  );
  console.log("------------"); */

  return (
    <div className="dial__fr-cont" style={style}>
      <span className="dial__fr">{deg + 240 * n}</span>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Fr);
