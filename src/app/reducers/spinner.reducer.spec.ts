import spinnerReducer from './spinner.reducer';

import { TrackActions } from '../actions/track.actions';
import { PlayerActions } from '../actions/player.actions';

'use strict';

describe('Spinner Reducer', () => {

  let trackActions = new TrackActions(),
      playerActions = new PlayerActions(),
      state;

  beforeEach(() => {
    state = {
      isSpinning: false
    };

    Object.freeze(state);
  });

  it('should pass', () => {
    expect(true).toBe(true);
  });

});