import {Track} from './track.model';
import {Player} from './player.model';

export interface AppStore {
  tracks: Track[];
  player: Player;
};
