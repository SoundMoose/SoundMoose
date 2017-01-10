export interface AudioStreamModel {
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
