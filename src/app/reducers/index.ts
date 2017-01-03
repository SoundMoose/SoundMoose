import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
// import { storeLogger } from 'ngrx-store-logger';

import songListReducer, * as fromSongList from './song-list';
import songReducer, * as fromSong from './song';

export interface AppState {
  songs: fromSongList.SongListState;
  song: fromSong.SongState;
}

// export default compose(storeLogger(), combineReducers)({
export default compose(combineReducers)({
  songs: songListReducer,
  song: songReducer
});