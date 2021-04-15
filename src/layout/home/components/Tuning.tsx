import React from 'react';

const Tuning = () => {
  return (
    <div className='tuning'>
      <div className='tuning__string'>
        <span className='tuning__note'>E</span>
        <div className='tuning__note-info'>
          <span className='tuning__note-sharp'>#</span>
          <span className='tuning__note-octave'>4</span>
        </div>
      </div>
      <div className='tuning__string active'>
        <span className='tuning__note'>A</span>
      </div>
      <div className='tuning__string'>
        <span className='tuning__note'>D</span>
      </div>
      <div className='tuning__string'>
        <span className='tuning__note'>G</span>
      </div>
      <div className='tuning__string'>
        <span className='tuning__note'>B</span>
      </div>
      <div className='tuning__string'>
        <span className='tuning__note'>E</span>
      </div>
    </div>
  );
};

export default Tuning;
