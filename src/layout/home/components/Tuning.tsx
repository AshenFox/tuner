import React, { EventHandler } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';
import { Tunings } from '../../../store/types/state';
import { set_active_note } from '../../../store/actions/mainActions';

interface OwnProps {}

interface StateProps {
  main: { most_freq_fr: number; tunings: Tunings };
}

interface DispatchProps {
  set_active_note: typeof set_active_note;
}

type Props = OwnProps & StateProps & DispatchProps;

const Tuning: React.FC<Props> = ({ main, set_active_note }) => {
  const { tunings } = main;

  const activeTuning = tunings.find((tuning) => tuning.active);
  const activeNote = activeTuning?.data.find(({ active }) => active);

  const onClickHandler = (key: number, active: boolean) => (e: React.MouseEvent) => {
    if (!active) set_active_note(key);
  };

  return (
    <div className='tuning'>
      {activeTuning?.data.map(({ name, sign, octave, active }, i, arr) => (
        <div className='tuning__string-cont' key={i}>
          <div className='tuning__string-number'>{arr.length - i}.</div>
          <div
            className={`tuning__string ${active && 'active'}`}
            onClick={onClickHandler(i, active)}
          >
            <div className='tuning__note-holder'>
              <span className='tuning__note'>{name}</span>
              <div className='tuning__note-info'>
                <span className='tuning__note-octave'>{octave}</span>
                {sign && <span className='tuning__note-sharp'>#</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps, {
  set_active_note,
})(Tuning);
