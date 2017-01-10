export interface AudioStream {
  // 2D Visualizations
  frequencyDataArray: Uint8Array;
  waveformDataArray: Uint8Array;
  audioSrcNode: MediaElementAudioSourceNode;
  waveformBufferLength: number;
  frequencyBufferLength: number;
  audioElement: any;
  audioCtx: any;

  // Equalizer - In Development
  highBand: any;
  midBand: any;
  lowBand: any;

};

export class AudioStream {
};

export const AUDIO_STREAM_PROVIDER = {
  provide: AudioStream,
  useFactory: () => {
    let audioElement = new Audio(),
        audioCtx,
        audioSrcNode,
        frequencyAnalyser,
        waveformAnalyser,
        frequencyBufferLength,
        waveformBufferLength,
        frequencyDataArray,
        waveformDataArray;

      audioCtx = new AudioContext();
      audioSrcNode = audioCtx.createMediaElementSource(audioElement);
      audioSrcNode.connect(audioCtx.destination);

      frequencyAnalyser = audioCtx.createAnalyser();
      waveformAnalyser = audioCtx.createAnalyser();
      frequencyAnalyser.smoothingTimeConstant = 0.5;
      // waveformAnalyser.smoothingTimeConstant = 0.15;
      audioSrcNode.connect(frequencyAnalyser);
      audioSrcNode.connect(waveformAnalyser);

      frequencyAnalyser.fftSize = 1024;
      waveformAnalyser.fftSize = 2048;
      frequencyBufferLength = frequencyAnalyser.frequencyBinCount;
      waveformBufferLength = waveformAnalyser.frequencyBinCount;

      frequencyDataArray = new Uint8Array(frequencyBufferLength);
      waveformDataArray = new Uint8Array(waveformBufferLength);

      audioSrcNode.connect(audioCtx.destination);

      frequencyAnalyser.getByteFrequencyData(frequencyDataArray);
      waveformAnalyser.getByteTimeDomainData(waveformDataArray);

/////////////// In-Development Equalizer Component  ////////////////////
      let gainDb,
        bandSplit,
        highBand,
        midBand,
        lowBand,
        highGain,
        midGain,
        lowGain,
        hInvert,
        lInvert,
        sum,
        masterGain;

      masterGain = audioCtx.createGain();
      masterGain.gain.value = -40;

      gainDb = -40.0;
      // gainDb = 0.0;
      bandSplit = [ 360, 1000, 3600 ];

      lowBand = audioCtx.createBiquadFilter();
      lowBand.type = "lowshelf";
      lowBand.frequency.value = bandSplit[0];
      lowBand.gain.value = gainDb;
      lowBand.connect( masterGain );

      midBand = audioCtx.createBiquadFilter();
    	midBand.type = "peaking";
    	midBand.frequency.value = bandSplit[1];
    	midBand.Q.value = 0.5;
    	midBand.gain.value = gainDb;
    	midBand.connect( lowBand );

      highBand = audioCtx.createBiquadFilter();
      highBand.type = "highshelf";
      highBand.frequency.value = bandSplit[2];
      highBand.gain.value = gainDb;
      highBand.connect( midBand );

      audioSrcNode.connect(highBand);
      // audioSrcNode.connect(audioCtx.destination);

////////// End of In-Development Equalizer Component ////////////////


      setInterval(function() {
        frequencyAnalyser.getByteFrequencyData(frequencyDataArray);
        waveformAnalyser.getByteTimeDomainData(waveformDataArray);
      }, 100);

      return {
        audioSrcNode: audioSrcNode,
        audioElement: audioElement,
        audioCtx: audioCtx,
        frequencyDataArray: frequencyDataArray,
        waveformDataArray: waveformDataArray,
        waveformBufferLength: waveformBufferLength,
        frequencyBufferLength: frequencyBufferLength,


        // Temporary for Equalizer component:
        // lowGain: lowBand.gain.value,
        // midGain: midBand.gain.value,
        // highGain: highBand.gain.value
        lowBand: lowBand,
        midBand: midBand,
        highBand: highBand
      };
  },
};
