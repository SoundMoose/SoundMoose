import { Track } from './track.model';

export interface SongQueue {
  currentId: number;
  tracks: Track[];
}
