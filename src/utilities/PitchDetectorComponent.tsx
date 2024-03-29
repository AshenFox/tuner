import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { set_fr } from '../store/actions/mainActions';
import { PitchDetector } from 'pitchy';

interface OwnProps {}

type Props = OwnProps;

const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
let stream: MediaStream;
let audioContext: AudioContext;
let analyserNode: AnalyserNode;
let mediaStreamSource: MediaStreamAudioSourceNode;
let detector: PitchDetector<Float64Array>;
let inputFloat32Array: Float32Array;

const PitchDetectorComponent: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  // Declare functions

  // ==============================
  // ==============================
  // ==============================

  const setup = async () => {
    if (!stream) {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } else {
      stream.getTracks()[0].enabled = true;
    }

    if (!audioContext) audioContext = new AudioContextConstructor();
    if (!analyserNode) analyserNode = audioContext.createAnalyser();

    if (!mediaStreamSource) {
      mediaStreamSource = audioContext.createMediaStreamSource(stream);
      mediaStreamSource.connect(analyserNode);
    }

    if (!detector) detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
    if (!inputFloat32Array) inputFloat32Array = new Float32Array(detector.inputLength);

    updatePitch(analyserNode, detector, inputFloat32Array, audioContext.sampleRate);
  };

  const updatePitch = (
    analyserNode: AnalyserNode,
    detector: PitchDetector<Float64Array>,
    inputFloat32Array: Float32Array,
    sampleRate: number
  ) => {
    analyserNode.getFloatTimeDomainData(inputFloat32Array);
    const [fr] = detector.findPitch(inputFloat32Array, sampleRate);

    dispatch(set_fr(fr));

    const isMuted = !stream.getTracks()[0].enabled;

    if (!isMuted)
      window.setTimeout(
        () => updatePitch(analyserNode, detector, inputFloat32Array, sampleRate),
        100
      );
  };

  // ==============================
  // ==============================
  // ==============================

  useEffect(() => {
    // Initiate pitch detection
    setup();

    return () => {
      stream.getTracks()[0].enabled = false;
    };
  }, []);

  return <></>;
};

export default PitchDetectorComponent;
