import { TracksState } from '../reducers/tracks.reducer';
import { TrackDetailsState } from '../reducers/track-details.reducer';
import { PlayerState } from '../reducers/player.reducer';
import { SpinnerState } from '../reducers/spinner.reducer';
import { SoundmooseUser } from '../models/soundmoose-user.model';

import { CommentsState } from '../reducers/comments.reducer';
import { AudioControls } from './audio-controls.model'

export interface AppStore {
  tracks: TracksState;
  player: PlayerState;
  audiocontrols: AudioControls;
  trackDetails: TrackDetailsState;
  comments: CommentsState;
  soundmooseUser: SoundmooseUser;
  spinner: SpinnerState;
};
