import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../store/store';
import { Tunings } from '../../../../store/types/state';

interface OwnProps {}

interface StateProps {
  main: { most_freq_fr: number; tunings: Tunings };
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Indicator: React.FC<Props> = ({ main }) => {
  const { most_freq_fr, tunings } = main;

  const value: number = Math.round(most_freq_fr * 10) / 10;

  const activeTuning = tunings.find((tuning) => tuning.active);
  const activeStringFr = activeTuning?.data.find(({ active }) => active)?.fr;

  const isTuned =
    typeof activeStringFr === 'number'
      ? Math.abs(most_freq_fr - activeStringFr) <= 0.5
      : false;

  // tip text calculation
  let tipText = 'lower';

  if (typeof activeStringFr === 'number' && most_freq_fr < activeStringFr)
    tipText = 'higher';
  if (isTuned) tipText = 'in tune';
  // ==========

  return (
    <div className={`dial__indicator-cont ${isTuned && 'active'}`}>
      <div className='dial__indicator'>
        {value}
        {value % 1 ? '' : '.0'}
        <span>Hz</span>
      </div>
      <div className='dial__indicator-tip'>{tipText}</div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Indicator);
