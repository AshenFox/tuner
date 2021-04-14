import React from "react";

const Note = () => {
  return (
    <div className="dial__note-cont">
      <div className="dial__note-holder">
        <span className="dial__note">C</span>
        <div className="dial__note-info">
          <span className="dial__note-sharp">#</span>
          <span className="dial__note-octave">4</span>
        </div>
      </div>
      <div className="dial__note-fr">127Hz</div>
    </div>
  );
};

export default Note;
