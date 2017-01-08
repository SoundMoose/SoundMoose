import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Track } from '../models/track.model';
import { TrackActions } from '../actions/track.actions';

export type TracksState = Track[];

const initialState: TracksState = [];

export default function (state = initialState, action: Action): TracksState {
  switch (action.type) {
    case TrackActions.LOAD_TRACKS_START:
      return [];
    case TrackActions.LOAD_TRACKS_SUCCESS:
      return action.payload;
    case TrackActions.TOGGLE_PLAY_PAUSE:
      return state;
    default:
      return state;
  }
}
