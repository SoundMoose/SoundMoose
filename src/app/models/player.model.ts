import { Track } from './track.model';

export interface Player {
  isPlaying: boolean;
  currentTrack: Track;
  millisecondProgressWhenStartedPlaying: number;
  timestampWhenStartedPlaying: number;
  volume: number;
  isMuted: boolean;
  volumeBeforeMute: number;
  repeatTrack: boolean;
  shuffleTracks: boolean;
  bufferedRanges: Array<number>;
  showVisualization: boolean;
}
