import { Action } from '@ngrx/store';

import { Player } from '../models/player.model';
import { PlayerActions } from '../actions/player.actions';

export type PlayerState = Player;

const initialState: PlayerState = {
  isPlaying: false,
  trackId: 0,
  volume: 5,
};

export default function (state = initialState, action: Action): PlayerState {
  switch (action.type) {
    // case PlayerActions.PLAYING_SONG: {
    //   return state.set('isPlaying', true) as PlayerState;
    // }

    default: {
      return state;
    }
  }
}
