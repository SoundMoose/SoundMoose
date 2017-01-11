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
    let audioElement,
        audioCtx,
        audioSrcNode,
        frequencyAnalyser,
        waveformAnalyser,
        frequencyBufferLength,
        waveformBufferLength,
        frequencyDataArray,
        waveformDataArray;

      audioCtx = new AudioContext();
      audioElement =  new Audio();
      audioSrcNode = audioCtx.createMediaElementSource(audioElement);
      // audioSrcNode.connect(audioCtx.destination);

      frequencyAnalyser = audioCtx.createAnalyser();
      waveformAnalyser = audioCtx.createAnalyser();
      frequencyAnalyser.smoothingTimeConstant = 0.5;
      audioSrcNode.connect(frequencyAnalyser);
      audioSrcNode.connect(waveformAnalyser);

      frequencyAnalyser.fftSize = 1024;
      waveformAnalyser.fftSize = 2048;
      frequencyBufferLength = frequencyAnalyser.frequencyBinCount;
      waveformBufferLength = waveformAnalyser.frequencyBinCount;

      frequencyDataArray = new Uint8Array(frequencyBufferLength);
      waveformDataArray = new Uint8Array(waveformBufferLength);

      // audioSrcNode.connect(audioCtx.destination);

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
        masterGain;

       //set the filter types (you could set all to 5, for a different result, feel free to experiment)
       //https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#BANDPASS
      //  lowshelf.type = 3;
      //  mid.type = 5;
      //  highshelf.type = 4;
      // filters with type 5 (peaking), which lets all frequencies through and only amplifies/reduce at the frequency at which you've set the respective filter.frequency.value.

      highGain = 1.0;
      midGain = 1.0;
      lowGain = 1.0;
      bandSplit = [ 320, 1000, 3600 ];

      lowBand = audioCtx.createBiquadFilter();
      lowBand.type = "highshelf";
      lowBand.frequency.value = bandSplit[0];
      lowBand.gain.value = lowGain;

      midBand = audioCtx.createBiquadFilter();
    	midBand.type = "peaking";
    	midBand.frequency.value = bandSplit[1];
    	// midBand.Q.value = 0.5;
    	midBand.gain.value = midGain;

      highBand = audioCtx.createBiquadFilter();
      highBand.type = "lowshelf";
      highBand.frequency.value = bandSplit[2];
      highBand.gain.value = highGain;

      audioSrcNode.connect( lowBand );
      lowBand.connect( midBand );
      midBand.connect( highBand );
      highBand.connect( audioCtx.destination );

      // audioElement.src = './assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3';
      // audioElement.play();

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
        toggleFrequencyOrWaveform: false,

        
        lowBand: lowBand,
        midBand: midBand,
        highBand: highBand
      };
  },
};
