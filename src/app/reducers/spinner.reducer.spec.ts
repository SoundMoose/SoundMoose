import spinnerReducer from './spinner.reducer';

import { TrackActions } from '../actions/track.actions';
import { PlayerActions } from '../actions/player.actions';

'use strict';

describe('Spinner Reducer', () => {

  let trackActions = new TrackActions(),
      playerActions = new PlayerActions(),
      state,
      tracks;

  beforeEach(() => {
    state = {
      isSpinning: false
    };

    tracks = [
      {
        id: 1,
        title: 'Tacos',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 123
      }, {
        id: 2,
        title: 'Burritos',
        artist: 'Mexican Food',
        imgUrl: 'http://www.google.com',
        streamUrl: 'http://www.google.com',
        duration: 123
      }
    ];

    Object.freeze(state);
  });

  it('should handle no state being passed an unknown actions', () => {
    // Handling an undefined state and unknown action.
    let actual = spinnerReducer(undefined, { type: 'TACOS' });

    // Should return the default state.
    expect(actual).toEqual(state);
  });

  it('should set the spinner to true when we start to load the tracks list', () => {
    // Start loading a Tracks List.
    let actual = spinnerReducer(state, trackActions.loadTracksStart());

    // isSpinning should be true.
    expect(actual.isSpinning).toBe(true);
  });

  it('should set the spinner to false when the tracks list loads', () => {
    // Start loading a Tracks List.
    let actual1 = spinnerReducer(state, trackActions.loadTracksStart());
    // Tracks List loaded.
    let actual2 = spinnerReducer(actual1, trackActions.loadTracksSuccess(tracks));

    // isSpinning should be false.
    expect(actual2.isSpinning).toBe(false);
  });

  it('should set the spinner to true when a track starts to load', () => {
    // Start loading a Track.
    let actual = spinnerReducer(state, playerActions.startAudioLoading());

    // isSpinning should be true.
    expect(actual.isSpinning).toBe(true);
  });

  it('should set the spinner to false when a track starts to play', () => {
    // Start loading a track.
    let actual1 = spinnerReducer(state, playerActions.startAudioLoading());
    // Track starts playing.
    let actual2 = spinnerReducer(state, playerActions.startAudioPlaying({}));

    // isSpinning should be false.
    expect(actual2.isSpinning).toBe(false);
  });

});