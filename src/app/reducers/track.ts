import { Action } from '@ngrx/store';

import { Track } from '../models';
import { TrackActions } from '../actions';

export type TrackState = Track;

const initialState: TrackState = {
  id: 0,
  name: '',
  artist: '',
  imgUrl: '',
  streamUrl: ''
};

export default function (state = initialState, action: Action): SongState {
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
