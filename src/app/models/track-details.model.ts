import { Track } from './track.model';
import { User } from './user.model';

export interface TrackDetails {
  track: Track;
  user: User;
  waveformUrl: string;
  description: string;
  license: string;
  commentCount: number;
  playbackCount: number;
  favoriteCount: number;
}
