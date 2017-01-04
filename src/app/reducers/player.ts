import { Action } from '@ngrx/store';

import { Player } from '../models';
import { SongActions } from '../actions';

export type PlayerState = Player;

const initialState: PlayerState = {
  isPlaying: false,
  trackId: 0,
  volume: 5,
};

export default function (state = initialState, action: Action): PlayerState {
  switch (action.type) {
    case SongActions.GET_SONG_SUCCESS: {
      return action.payload;
    }

    // ..

    default: {
      return state;
    }
  }
}
