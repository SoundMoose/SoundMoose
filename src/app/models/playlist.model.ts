import { Track } from './track.model';

export interface Playlist {
  id: number;
  userId: string;
  name: string;
  tracks: Track[];
}
