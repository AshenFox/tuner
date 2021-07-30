import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../store/store';
import { set_fr } from '../../../store/actions/mainActions';
import ml5 from 'ml5';

let audioContext = window.AudioContext || window.webkitAudioContext;
let audioContextInstance: AudioContext;
let pitchDetection: any;
let stream: MediaStream;

interface OwnProps {}

type Props = OwnProps;

const PitchDetector: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

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

    audioContextInstance = new audioContext();
    startPitch(stream, audioContextInstance);
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
      if (fr) dispatch(set_fr(fr));

      getPitch();
    });
  };

  // ==============================
  // ==============================
  // ==============================

  return <></>;
};

export default PitchDetector;
