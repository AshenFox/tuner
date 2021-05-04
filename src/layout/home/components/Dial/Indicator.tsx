import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../store/store';

interface OwnProps {}

interface StateProps {
  main: { most_freq_fr: number };
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Indicator: React.FC<Props> = ({ main }) => {
  const { most_freq_fr } = main;

  const value: number = Math.round(most_freq_fr * 10) / 10;

  return (
    <div className='dial__indicator-cont'>
      <div className='dial__indicator'>
        {value}
        {value % 1 ? '' : '.0'}
        <span>Hz</span>
      </div>
      <div className='dial__indicator-tip'>lower</div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Indicator);
