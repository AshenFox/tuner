import React from "react";
import Notch from "./Notch";

interface OwnProps {
  num: number;
}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Notches: React.FC<Props> = ({ num }) => {
  return (
    <>
      {[...new Array(num)].map((_, i) => (
        <Notch key={i} deg={i} />
      ))}
    </>
  );
};

export default Notches;
