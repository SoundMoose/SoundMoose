import { TracksState } from '../reducers/tracks.reducer';
import { PlayerState } from '../reducers/player.reducer';
import { AudioControls } from './audio-controls.model';

export interface AppStore {
  tracks: TracksState;
  player: PlayerState;
  audiocontrols: AudioControls;
};
