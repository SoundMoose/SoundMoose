import tracksReducer from './tracks.reducer';

import { Track } from '../models/track.model';

import { TrackActions } from '../actions/track.actions';

'use strict';

describe('Tracks Reducer', () => {

  let trackActions = new TrackActions(),
      state,
      tracks;

  beforeEach(() => {
    state = [];

    tracks = [
      {
        id: 1,
        title: 'Tacos',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 123,
        platform: 'pizza'
      }, {
        id: 2,
        title: 'Burritos',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 123,
        platform: 'pizza'
      }
    ];

    Object.freeze(state);
  });

  it('should handle no state being passed in and unknown action types', () => {
    // Dispatching an undefined state and unknown action.
    let actual = tracksReducer(undefined, { type: 'TACOS' });

    // Simply return the current state.
    expect(actual).toEqual(state);
  });

  it('should load tracks' , () => {
    // Loads new tracks.
    let actual = tracksReducer(state, trackActions.loadTracksSuccess(tracks));

    // The tracks should now be the ones we told it to load.
    expect(actual).toEqual(tracks);
  });

  it('should clear the tracks list' , () => {
    // Loads new tracks.
    let actual1 = tracksReducer(state, trackActions.loadTracksSuccess(tracks));
    // Clears tracks.
    let actual2 = tracksReducer(actual1, trackActions.loadTracksStart());

    // The tracks list should now be empty.
    expect(actual2).toEqual([]);
  });

});
