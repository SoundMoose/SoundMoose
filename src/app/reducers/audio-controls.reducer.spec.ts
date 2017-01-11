import audioControlsReducer from './audio-controls.reducer';

import { AudioControlsActions } from '../actions/audio-controls.actions';

'use strict';

describe('Audio-Controls Reducer', () => {

  let audioControlsActions = new AudioControlsActions(),
      state;

  beforeEach(() => {
    state = {
      showAudioControls: true,
      lowBand: {
        gain: {
          value: 0.5,
        }
      },
      midBand: {
        gain: {
          value: 0.5,
        }
      },
      highBand: {
        gain: {
          value: 0.5,
        }
      }
    };

    Object.freeze(state);
  });

  it('should handle no state being passed in and unknown types', () => {
    // Dispatching an undefined state and unknown action.
    let actual = audioControlsReducer(undefined, {type: 'TACOS'});

    // Just return the default state.
    expect(state).toEqual(actual);
  });

});