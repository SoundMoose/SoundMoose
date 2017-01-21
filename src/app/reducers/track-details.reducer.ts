import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TrackDetails } from '../models/track-details.model';
import { TrackDetailsActions } from '../actions/track-details.actions';

export type TrackDetailsState = TrackDetails;

const initialState: TrackDetailsState = {
  track: {
    title: '',
    artist: '',
    imgUrl: '',
    streamUrl: '',
    duration: 0,
    platform: '',
    trackId: '0'
  },
  user: {
    id: 0,
    username: '',
    avatarUrl: ''
  },
  waveformUrl: '',
  largeArtworkUrl: '',
  description: '',
  license: '',
  commentCount: 0,
  playbackCount: 0,
  favoriteCount: 0,
  created: ''
};

export default function (state = initialState, action: Action): TrackDetailsState {
  switch (action.type) {
    case TrackDetailsActions.LOAD_TRACK_DETAILS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
