import { Action } from '@ngrx/store';

import { SpinnerActions } from '../actions/spinner.actions';
import { TrackActions } from '../actions/track.actions';

const initialState: any = {
  isSpinning: false,
};

export default function (state = initialState, action: Action): any {
  switch (action.type) {

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

    case TrackActions.TOGGLE_PLAY_PAUSE: {
      // Pause Track because we clicked the track that was already playing.
      if (state.currentTrack.id !== action.payload.id) {
        return Object.assign({}, state, {
          isSpinning: true,
        });
      }
    }

    default: {
      return state;
    }
  }
}
