import { Action } from '@ngrx/store';

import { Track } from '../models/track.model';
import { SongQueue } from '../models/song-queue.model';

export type SongQueueState = SongQueue;

const initialState: SongQueueState = {
  currentId: 0,

  tracks: []
};

export default function (state = initialState, action: Action): SongQueueState {
  switch (action.type) {

    // case PlaylistActions.LOAD_TRACKS: {
    //   return action.payload;
    // }
    //
    // case PlaylistActions.CHANGE_ORDER: {
    //   let newTracks = state.tracks.slice();
    //   let trackToMove = newTracks.splice(action.payload.oldIndex, 1);
    //   newTracks.splice(action.payload.newIndex, 0, trackToMove[0]);
    //
    //   let newState = Object.assign({}, state, {
    //     tracks: newTracks
    //   });
    //   return newState;
    // }
    //
    // case PlaylistActions.REMOVE_TRACK: {
    //   let newTracks = state.tracks.filter(ele => !(ele.trackId === action.payload.trackId && ele.platform === action.payload.trackPlatform));
    //
    //   let newState = Object.assign({}, state, {
    //     tracks: newTracks
    //   });
    //   return newState;
    // }
    //
    default: {
      return state;
    }

  }

}
