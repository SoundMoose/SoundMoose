'use strict';

import trackDetailsReducer from './track-details.reducer';
import { TrackDetailsActions } from '../actions/track-details.actions';

describe('Track-Details Reducer', () => {

  let trackDetailsActions = new TrackDetailsActions(),
      state,
      track;

  beforeEach(() => {
    state = {
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

    track = {
      track: {
        title: 'Tacos',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 123,
        platform: 'pizza'
      },
      user: {
        id: 1,
        username: 'texmex4lyfe',
        avatarUrl: 'http://www.google.com'
      },
      waveformUrl: 'http://www.google.com',
      description: 'Best song about tacos ever!',
      license: 'none',
      commentCount: 1,
      playbackCount: 3,
      favoriteCount: 3,
      created: 'today'
    };

    Object.freeze(state);
  });

  it('should handle undefined state and known actions', () => {
    // Handling a bad dispatch.
    let actual = trackDetailsReducer(undefined, { type: 'TACOS' });

    // Should return the default state.
    expect(actual).toEqual(state);
  });

  it('should load track details', () => {
    // Load track-details.
    let actual = trackDetailsReducer(state, trackDetailsActions.loadTrackDetailsSuccess(track));

    // Should be the track details we passed in.
    expect(actual).toEqual(track);
  });

});
