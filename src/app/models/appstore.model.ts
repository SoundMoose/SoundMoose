import { Track } from './track.model';
import { Player } from './player.model';
import { AudioControls } from './audio-controls.model'

export interface AppStore {
  tracks: Track[];
  player: Player;
  audiocontrols: AudioControls;
};
