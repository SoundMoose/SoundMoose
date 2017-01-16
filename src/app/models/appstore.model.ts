import { TracksState } from '../reducers/tracks.reducer';
import { TrackDetailsState } from '../reducers/track-details.reducer';
import { PlayerState } from '../reducers/player.reducer';
import { PlaylistState } from '../reducers/playlist.reducer';

import { CommentsState } from '../reducers/comments.reducer';
import { AudioControls } from './audio-controls.model'

export interface AppStore {
  tracks: TracksState;
  player: PlayerState;
  audiocontrols: AudioControls;
  trackDetails: TrackDetailsState;
  comments: CommentsState;
  playlist: PlaylistState;
};
