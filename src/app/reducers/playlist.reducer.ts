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

    default: {
      return state;
    }
  }
}
