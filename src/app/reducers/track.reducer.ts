import { Action } from '@ngrx/store';

import { Track } from '../models/track.model';
import { TrackActions } from '../actions/track.actions';

// export * from './player.reducer';
// export * from './tracks.reducer';

export type TrackState = Track;

const initialState: TrackState = {
  id: 0,
  name: '',
  artist: '',
  imgUrl: '',
  streamUrl: '',
  duration: 0
};

export default function (state = initialState, action: Action): TrackState {
  switch (action.type) {
    case TrackActions.GET_TRACK_SUCCESS: {
      return action.payload;
    }

    // ..

    default: {
      return state;
    }
  }
}
