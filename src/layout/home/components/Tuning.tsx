import React from 'react';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps;

const Tuning: React.FC<Props> = () => {
  return (
    <div className='tuning'>
      <div className='tuning__string '>
        <div className='tuning__note-holder'>
          <span className='tuning__note'>E</span>
          <div className='tuning__note-info'>
            <span className='tuning__note-octave'>2</span>
          </div>
        </div>
      </div>
      <div className='tuning__string active'>
        <div className='tuning__note-holder'>
          <span className='tuning__note'>A</span>
          <div className='tuning__note-info'>
            {/* <span className="tuning__note-sharp">#</span> */}
            <span className='tuning__note-octave'>2</span>
          </div>
        </div>
      </div>
      <div className='tuning__string'>
        <div className='tuning__note-holder'>
          <span className='tuning__note'>D</span>
          <div className='tuning__note-info'>
            <span className='tuning__note-octave'>3</span>
          </div>
        </div>
      </div>
      <div className='tuning__string'>
        <div className='tuning__note-holder'>
          <span className='tuning__note'>G</span>
          <div className='tuning__note-info'>
            <span className='tuning__note-octave'>3</span>
          </div>
        </div>
      </div>
      <div className='tuning__string'>
        <div className='tuning__note-holder'>
          <span className='tuning__note'>B</span>
          <div className='tuning__note-info'>
            <span className='tuning__note-octave'>3</span>
          </div>
        </div>
      </div>
      <div className='tuning__string'>
        <div className='tuning__note-holder'>
          <span className='tuning__note'>E</span>
          <div className='tuning__note-info'>
            {/* <span className="tuning__note-sharp">#</span> */}
            <span className='tuning__note-octave'>4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tuning;
