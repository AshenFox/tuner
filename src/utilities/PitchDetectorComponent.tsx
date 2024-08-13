import { memo, useCallback, useEffect } from 'react';
import { useActions } from '@store/hooks';
import { PitchDetector } from 'pitchy';

const AudioContextConstructor =
  window.AudioContext || window.webkitAudioContext;
let stream: MediaStream;
let audioContext: AudioContext;
let analyserNode: AnalyserNode;
let mediaStreamSource: MediaStreamAudioSourceNode;
let detector: PitchDetector<Float64Array>;
let inputFloat32Array: Float32Array;

const PitchDetectorComponent = () => {
  const { set_fr } = useActions();

  // Declare functions

  // ==============================
  // ==============================
  // ==============================

  const updatePitch = useCallback(
    (
      analyserNode: AnalyserNode,
      detector: PitchDetector<Float64Array>,
      inputFloat32Array: Float32Array,
      sampleRate: number
    ) => {
      analyserNode.getFloatTimeDomainData(inputFloat32Array);
      const [fr] = detector.findPitch(inputFloat32Array, sampleRate);

      set_fr(fr);

      const isMuted = !stream.getTracks()[0].enabled;

      if (!isMuted) {
        window.setTimeout(
          () =>
            updatePitch(analyserNode, detector, inputFloat32Array, sampleRate),
          100
        );
      }
    },
    [set_fr]
  );

  const setup = useCallback(async () => {
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

    if (!detector)
      detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
    if (!inputFloat32Array)
      inputFloat32Array = new Float32Array(detector.inputLength);

    updatePitch(
      analyserNode,
      detector,
      inputFloat32Array,
      audioContext.sampleRate
    );
  }, [updatePitch]);

  // ==============================
  // ==============================
  // ==============================

  useEffect(() => {
    // Initiate pitch detection
    setup();

    return () => {
      if (stream) stream.getTracks()[0].enabled = false;
    };
  }, [setup]);

  return null;
};

export default memo(PitchDetectorComponent);
