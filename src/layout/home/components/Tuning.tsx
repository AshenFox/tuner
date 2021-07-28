import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { set_active_note } from '../../../store/actions/mainActions';

interface OwnProps {}

type Props = OwnProps;

const Tuning: React.FC<Props> = (props) => {
  const { tunings } = useAppSelector((state) => state.main);

  const dispatch = useAppDispatch();

  const activeTuning = tunings.find((tuning) => tuning.active);
  const activeNote = activeTuning?.data.find(({ active }) => active); // ?????

  const onClickHandler = (key: number, active: boolean) => (e: React.MouseEvent) => {
    if (!active) dispatch(set_active_note(key));
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

export default Tuning;
