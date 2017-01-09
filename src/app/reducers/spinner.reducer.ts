import { Action } from '@ngrx/store';

import { TrackActions } from '../actions/track.actions';
import { PlayerActions } from '../actions/player.actions';

export type SpinnerState = {
  isSpinning: boolean;
};

const initialState: SpinnerState = {
  isSpinning: false,
};

export default function (state = initialState, action: Action): SpinnerState {
  switch (action.type) {

    // Load tracks begin / end
    case TrackActions.LOAD_TRACKS_START: {
      return Object.assign({}, state, {
        isSpinning: true,
      });
    }
    case TrackActions.LOAD_TRACKS_SUCCESS: {
      return Object.assign({}, state, {
        isSpinning: false,
      });
    }

    // Start loading / start playing
    case PlayerActions.START_AUDIO_LOADING: {
     return Object.assign({}, state, {
        isSpinning: true,
      });
    }

    case PlayerActions.START_AUDIO_PLAYING: {
      return Object.assign({}, state, {
        isSpinning: false,
      });
    }

    default: {
      return state;
    }
  }
}
