import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
// import { storeLogger } from 'ngrx-store-logger';

import trackListReducer, * as fromTrackList from './tracks';
import trackReducer, * as fromTrack from './track';

export interface AppState {
  // tracks: fromTrackList.TracksState;
  track: fromTrack.TrackState;
}

// export default compose(storeLogger(), combineReducers)({
export default compose(combineReducers)({
  tracks: trackListReducer,
  track: trackReducer
});
