import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { set_fr } from '../../../store/actions/mainActions';
import ml5 from 'ml5';
import { AppState } from '../../../store/store';

let audioContext: AudioContext;
let pitchDetection: any;
let stream: MediaStream;

interface OwnProps {}

interface DispatchProps {
  set_fr: typeof set_fr;
}

type Props = DispatchProps & OwnProps;

const PitchDetector: React.FC<Props> = ({ set_fr }) => {
  useEffect(() => {
    // Initiate pitch detection
    setup();
  }, []);

  // Declare functions

  // ==============================
  // ==============================
  // ==============================

  const setup = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    audioContext = new AudioContext();
    startPitch(stream, audioContext);
  };

  const startPitch = (stream: any, audioContext: any) => {
    pitchDetection = ml5.pitchDetection('./model', audioContext, stream, modelLoaded);
  };

  const modelLoaded = () => {
    console.log('Model Loaded');
    getPitch();
  };

  const getPitch = () => {
    pitchDetection.getPitch(function (err: Error, fr: number) {
      if (fr) {
        set_fr(fr);
      }
      getPitch();
    });
  };

  // ==============================
  // ==============================
  // ==============================

  return <></>;
};

const mapStateToProps = (state: AppState) => ({
  main: state.main,
});

export default connect(mapStateToProps, {
  set_fr,
})(PitchDetector);
