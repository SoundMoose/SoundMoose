import { Track } from './track.model';

export interface Playlist {
  id: number;
  name: string;
  tracks: Track[];
}
