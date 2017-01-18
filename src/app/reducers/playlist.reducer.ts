import { Action } from '@ngrx/store';
import { PlaylistActions } from '../actions/playlist.actions';
import { Track } from '../models/track.model';
import { Playlist } from '../models/playlist.model';

export type PlaylistState = Playlist;

const initialState: PlaylistState = {
  id: 0,
  userId: '',
  name: '',
  tracks: []
};

export default function (state = initialState, action: Action): PlaylistState {
  switch (action.type) {

    case PlaylistActions.LOAD_TRACKS: {
      return action.payload;
    }

    case PlaylistActions.CHANGE_ORDER: {
      let newTracks = state.tracks.slice();
      let trackToMove = newTracks.splice(action.payload.oldIndex, 1);
      newTracks.splice(action.payload.newIndex, 0, trackToMove[0]);

      let newState = Object.assign({}, state, {
        tracks: newTracks
      });
      return newState;
    }

    case PlaylistActions.REMOVE_TRACK: {
      let newTracks = state.tracks.filter(ele => !(ele.trackId === action.payload.trackId && ele.platform === action.payload.trackPlatform));

      let newState = Object.assign({}, state, {
        tracks: newTracks
      });
      return newState;
    }

    default: {
      return state;
    }

  }

}
