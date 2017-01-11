import trackDetailsReducer from './track-details.reducer';

'use strict';

describe('Track-Details Reducer', () => {

  let state;

  beforeEach(() => {
    state = {
      track: {
        id: 0,
        title: '',
        artist: '',
        imgUrl: '',
        streamUrl: '',
        duration: 0
      },
      user: {
        id: 0,
        username: '',
        avatarUrl: ''
      },
      waveformUrl: '',
      description: '',
      license: '',
      commentCount: 0,
      playbackCount: 0,
      favoriteCount: 0,
      created: ''
    };

    Object.freeze(state);
  });

  it('should handle undefined state and known actions', () => {
    // Handling a bad dispatch.
    let actual = trackDetailsReducer(undefined, { type: 'TACOS' });

    // Should return the default state.
    expect(actual).toEqual(state);
  });

});