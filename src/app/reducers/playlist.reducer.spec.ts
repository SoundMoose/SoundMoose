import playlistReducer from './audio-controls.reducer';

import { PlaylistActions } from '../actions/playlist.actions';

'use strict';

describe('Playlist Reducer', () => {

  let playlistActions = new PlaylistActions(),
      state;

  beforeEach(() => {
    state = {};
    Object.freeze(state);
  });

  it('should handle no state being passed in and unknown types', () => {
    // Dispatching an undefined state and unknown action.
    let actual = playlistReducer(undefined, {type: 'TACOS'});

    // Just return the default state.
    expect(state).toEqual(actual);
  });

});
