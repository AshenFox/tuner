import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  set_active_note,
  auto_set_active_note,
} from '../../../store/actions/mainActions';

interface OwnProps {}

type Props = OwnProps;

const Tuning: React.FC<Props> = (props) => {
  const {
    tunings,
    most_freq_fr,
    settings: { auto_tuning },
  } = useAppSelector((state) => state.main);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auto_tuning) dispatch(auto_set_active_note()); // a
  }, [most_freq_fr, auto_tuning, dispatch]);

  const activeTuning = tunings.find((tuning) => tuning.active);

  const strings = activeTuning?.data || [];

  // const activeNote = activeTuning?.data.find(({ active }) => active);???????

  const onClickHandler =
    (id: string, active: boolean) => (e: React.MouseEvent) => {
      if (!active && !auto_tuning) dispatch(set_active_note(id));
    };

  return (
    <div className={`tuning ${auto_tuning ? '' : 'active'}`}>
      {strings.map(({ name, sign, octave, active, id }, i, arr) => (
        <div className="tuning__string-cont" key={id}>
          <div className="tuning__string-number">{arr.length - i}.</div>
          <div
            className={`tuning__string ${active && 'active'}`}
            onClick={onClickHandler(id, active)}
          >
            <div className="tuning__note-holder">
              <span className="tuning__note">{name}</span>
              <div className="tuning__note-info">
                <span className="tuning__note-octave">{octave}</span>
                {sign && <span className="tuning__note-sharp">#</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tuning;
