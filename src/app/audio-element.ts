export class AudioStream extends HTMLAudioElement {};

export const AUDIO_STREAM_PROVIDER = {
  provide: AudioStream,
  useFactory: () => {
    let audioElement = new Audio(),
        audioCtx,
        audioSrc,
        analyser,
        bufferLength,
        frequencyDataArray,
        waveformDataArray;

      audioCtx = new AudioContext();

      // below can also use .createMediaStreamSource if desirable
      audioSrc = audioCtx.createMediaElementSource(audioElement);
      audioSrc.connect(audioCtx.destination);

      analyser = audioCtx.createAnalyser();
      analyser.smoothingTimeConstant = 0.15;
      audioSrc.connect(analyser);

      // Fast Fourier Transform (fft) in a certain frequency domain. 1024, 2048, etc..
      analyser.fftSize = 256;
      bufferLength = analyser.frequencyBinCount;

      // Byte analyser Arrays (change to float if using .getFloat_____Data methods below)
      frequencyDataArray = new Uint8Array(bufferLength);
      waveformDataArray = new Uint8Array(bufferLength);

      audioSrc.connect(audioCtx.destination);

      // this could probably be more elegant

      analyser.getByteFrequencyData(frequencyDataArray);
      audioSrc.frequencyDataArray = frequencyDataArray;
      audioSrc.bufferLength = bufferLength;

      setInterval(function() {

        ////////////////////// Frequency Data: ////////////////////////
        // only use one of the next two lines (choose Float or Byte)
        // and remember to change the correstponding array type!
        analyser.getByteFrequencyData(frequencyDataArray);
        // analyser.getFloatFrequencyData(frequencyDataArray);
        // console.log('frequencyDataArray:', frequencyDataArray);

        audioSrc.frequencyDataArray = frequencyDataArray;

        ////////////////////// Waveform Data:  ////////////////////////
        // analyser.getByteTimeDomainData(waveformDataArray);
        // analyser.getFloatTimeDomainData(waveformDataArray);
        // console.log('waveformDataArray:', waveformDataArray);
      }, 100);

      return audioSrc;
  },
};
