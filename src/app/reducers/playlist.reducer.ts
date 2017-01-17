import { Action } from '@ngrx/store';

import { Track } from '../models/track.model';
import { PlaylistActions } from '../actions/playlist.actions';

export type PlaylistState = Track[];

const initialState: PlaylistState = [];

export default function (state = initialState, action: Action): PlaylistState {
  switch (action.type) {
    case PlaylistActions.LOAD_TRACKS: {
      return action.payload;
    }

    case PlaylistActions.CHANGE_ORDER: {
      let newState = state.slice();
      let trackToMove = newState.splice(action.payload.oldIndex, 1);
      newState.splice(action.payload.newIndex, 0, trackToMove[0]);
      return newState;
    }

    default: {
      return state;
    }
  }
}
