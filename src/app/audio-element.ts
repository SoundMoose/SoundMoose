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



       //set the filter types (you could set all to 5, for a different result, feel free to experiment)
       //https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#BANDPASS
      //  lowshelf.type = 3;
      //  mid.type = 5;
      //  highshelf.type = 4;
      // filters with type 5 (peaking), which lets all frequencies through and only amplifies/reduce at the frequency at which you've set the respective filter.frequency.value.


      // masterGain = audioCtx.createGain();
      // masterGain.gain.value = 0;
      //
      // // gainDb = 40.0;
      // // gainDb = 0.0;
      // bandSplit = [ 360, 1000, 3600 ];
      //
      // lowBand = audioCtx.createBiquadFilter();
      // midBand = audioCtx.createBiquadFilter();
      // highBand = audioCtx.createBiquadFilter();
      //
      // lowBand.type = "lowshelf";
      // midBand.type = "peaking";
      // highBand.type = "highshelf";
      //
      // lowBand.gain.value = gainDb;
      // // midBand.Q.value = 0.5;
      // midBand.gain.value = gainDb;
      // highBand.gain.value = gainDb;
      //
      // lowBand.frequency.value = bandSplit[0];
    	// midBand.frequency.value = bandSplit[1];
      // highBand.frequency.value = bandSplit[2];
      //
      // lowBand.gain.value = 1;
    	// midBand.gain.value = 1;
      // highBand.gain.value = 1;
      //
      // masterGain.connect(lowBand);
      // lowBand.connect(midBand);
      // midBand.connect(highBand);
      // highBand.connect(audioCtx.destination);

      // lowBand.connect( masterGain );
      // midBand.connect( lowBand );
      // highBand.connect( midBand );
      // audioSrcNode.connect(highBand);
      // audioSrcNode.connect(audioCtx.destination);

      // audioSrcNode.mediaElement.src = './assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3';
      // audioSrcNode.mediaElement.play();

////////// End of In-Development Equalizer Component ////////////////


      setInterval(function() {
        frequencyAnalyser.getByteFrequencyData(frequencyDataArray);
        waveformAnalyser.getByteTimeDomainData(waveformDataArray);
      }, 50);

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
