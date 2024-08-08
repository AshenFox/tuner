import { memo, MouseEventHandler, useEffect } from 'react';
import { useActions, useAppSelector } from '@store/hooks';

const Tuning = () => {
  const tunings = useAppSelector(s => s.main.tunings);
  const most_freq_fr = useAppSelector(s => s.main.most_freq_fr);
  const auto_tuning = useAppSelector(s => s.main.settings.auto_tuning);

  const { set_active_note, auto_set_active_note } = useActions();

  useEffect(() => {
    if (auto_tuning) auto_set_active_note();
  }, [most_freq_fr, auto_tuning, auto_set_active_note]);

  const activeTuning = tunings.find(tuning => tuning.active);

  const strings = activeTuning?.data || [];

  const onClickHandler: (id: string, active: boolean) => MouseEventHandler =
    (id, active) => () => {
      if (!active && !auto_tuning) set_active_note(id);
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

export default memo(Tuning);
