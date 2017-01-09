export interface AudioStream {
  frequencyDataArray: Uint8Array;
  waveformDataArray: Uint8Array;
  // audioSrc: MediaElementAudioSourceNode;
  waveformBufferLength: number;
  frequencyBufferLength: number;
  audioElement: any;
};
export class AudioStream {
};

export const AUDIO_STREAM_PROVIDER = {
  provide: AudioStream,
  useFactory: () => {
    let audioElement = new Audio(),
        audioCtx,
        audioSrc,
        frequencyAnalyser,
        waveformAnalyser,
        frequencyBufferLength,
        waveformBufferLength,
        frequencyDataArray,
        waveformDataArray;

      audioCtx = new AudioContext();
      audioSrc = audioCtx.createMediaElementSource(audioElement);
      audioSrc.connect(audioCtx.destination);

      frequencyAnalyser = audioCtx.createAnalyser();
      waveformAnalyser = audioCtx.createAnalyser();
      frequencyAnalyser.smoothingTimeConstant = 0.5;
      // waveformAnalyser.smoothingTimeConstant = 0.15;
      audioSrc.connect(frequencyAnalyser);
      audioSrc.connect(waveformAnalyser);

      // Fast Fourier Transform (fft) in a certain frequency domain. 1024, 2048, etc..
      frequencyAnalyser.fftSize = 1024;
      waveformAnalyser.fftSize = 2048;
      frequencyBufferLength = frequencyAnalyser.frequencyBinCount;
      waveformBufferLength = waveformAnalyser.frequencyBinCount;

      frequencyDataArray = new Uint8Array(frequencyBufferLength);
      waveformDataArray = new Uint8Array(waveformBufferLength);  // alternative: Float32Array

      audioSrc.connect(audioCtx.destination);

      frequencyAnalyser.getByteFrequencyData(frequencyDataArray); // alternative: getFloatFrequencyData
      waveformAnalyser.getByteTimeDomainData(waveformDataArray);

      // assign to properties of what will be returned
      // audioSrc.frequencyDataArray = frequencyDataArray;
      // audioSrc.waveformDataArray = waveformDataArray;
      // audioSrc.frequencyBufferLength = frequencyBufferLength;
      // audioSrc.waveformBufferLength = waveformBufferLength;

      setInterval(function() {

        ////////////////////// Frequency Data: ////////////////////////
        // only use one of the next two lines (choose Float or Byte)
        // and remember to change the correstponding array type!
        frequencyAnalyser.getByteFrequencyData(frequencyDataArray);
        // frequencyAnalyser.getFloatFrequencyData(frequencyDataArray);
        // console.log('frequencyDataArray:', frequencyDataArray);
        // audioSrc.frequencyDataArray = frequencyDataArray;

        ////////////////////// Waveform Data:  ////////////////////////
        waveformAnalyser.getByteTimeDomainData(waveformDataArray);
        // waveformAnalyser.getFloatTimeDomainData(waveformDataArray);
        // console.log('waveformDataArray:', waveformDataArray);
        // audioSrc.waveformDataArray = waveformDataArray;
      }, 100);

      return {
        // audioSrc: audioSrc,
        audioElement: audioElement,
        frequencyDataArray: frequencyDataArray,
        waveformDataArray: waveformDataArray,
        waveformBufferLength: waveformBufferLength,
        frequencyBufferLength: frequencyBufferLength
      };
  },
};
