import {Track} from './track.model';

export interface Player {
  isPlaying: boolean;
  currentTrack: Track;
  currentTime: number;
  volume: number;
}
