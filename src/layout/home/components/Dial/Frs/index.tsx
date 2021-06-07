import React from "react";
import Fr from "./Fr";

interface OwnProps {
  num: number;
}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Frs: React.FC<Props> = ({ num }) => {
  return (
    <>
      {[...new Array(num / 5)].map((_, i) => (
        <Fr key={i * 5} deg={i * 5} />
      ))}
    </>
  );
};

export default Frs;
