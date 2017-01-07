export class AudioStream extends HTMLAudioElement {};

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

      // below can also use .createMediaStreamSource if desirable
      audioSrc = audioCtx.createMediaElementSource(audioElement);
      audioSrc.connect(audioCtx.destination);

      frequencyAnalyser = audioCtx.createAnalyser();
      waveformAnalyser = audioCtx.createAnalyser();
      frequencyAnalyser.smoothingTimeConstant = 0.15;
      // waveformAnalyser.smoothingTimeConstant = 0.15;
      audioSrc.connect(frequencyAnalyser);
      audioSrc.connect(waveformAnalyser);

      // Fast Fourier Transform (fft) in a certain frequency domain. 1024, 2048, etc..
      frequencyAnalyser.fftSize = 256;
      waveformAnalyser.fftSize = 2048;
      frequencyBufferLength = frequencyAnalyser.frequencyBinCount;
      waveformBufferLength = waveformAnalyser.frequencyBinCount;

      // console.log('frequencyBufferLength',frequencyBufferLength);
      // console.log('waveformBufferLength',waveformBufferLength);

      // Byte frequencyAnalyser Arrays (change to float if using .getFloat_____Data methods below)
      frequencyDataArray = new Uint8Array(frequencyBufferLength);
      waveformDataArray = new Uint8Array(waveformBufferLength);  // Float32Array - alternative

      audioSrc.connect(audioCtx.destination);

      frequencyAnalyser.getByteFrequencyData(frequencyDataArray);
      waveformAnalyser.getByteTimeDomainData(waveformDataArray);
      // waveformAnalyser.getFloatTimeDomainData(waveformDataArray);


      // assign to properties of what will be returned
      audioSrc.frequencyDataArray = frequencyDataArray;
      audioSrc.waveformDataArray = waveformDataArray;
      audioSrc.frequencyBufferLength = frequencyBufferLength;
      audioSrc.waveformBufferLength = waveformBufferLength;

      setInterval(function() {

        ////////////////////// Frequency Data: ////////////////////////
        // only use one of the next two lines (choose Float or Byte)
        // and remember to change the correstponding array type!
        frequencyAnalyser.getByteFrequencyData(frequencyDataArray);
        // frequencyAnalyser.getFloatFrequencyData(frequencyDataArray);
        // console.log('frequencyDataArray:', frequencyDataArray);

        audioSrc.frequencyDataArray = frequencyDataArray;

        ////////////////////// Waveform Data:  ////////////////////////
        waveformAnalyser.getByteTimeDomainData(waveformDataArray);
        // waveformAnalyser.getFloatTimeDomainData(waveformDataArray);
        // console.log('waveformDataArray:', waveformDataArray);
        audioSrc.waveformDataArray = waveformDataArray;

      }, 50);

      return audioSrc;
  },
};
