import audioControlsReducer from './audio-controls.reducer';

import { AudioControlsActions } from '../actions/audio-controls.actions';

'use strict';

describe('Audio-Controls Reducer', () => {

  let audioControlsActions = new AudioControlsActions(),
      state;

  beforeEach(() => {
    state = {
      toggleFrequencyOrWaveform: true,
      lowBand: {
        gain: {
          value: 0,
        }
      },
      midBand1: {
        gain: {
          value: 0,
        }
      },
      midBand2: {
        gain: {
          value: 0,
        }
      },
      midBand3: {
        gain: {
          value: 0,
        }
      },
      midBand4: {
        gain: {
          value: 0,
        }
      },
      midBand5: {
        gain: {
          value: 0,
        }
      },
      midBand6: {
        gain: {
          value: 0,
        }
      },
      midBand7: {
        gain: {
          value: 0,
        }
      },
      midBand8: {
        gain: {
          value: 0,
        }
      },
      midBand9: {
        gain: {
          value: 0,
        }
      },
      midBand10: {
        gain: {
          value: 0,
        }
      },
      highBand: {
        gain: {
          value: 0,
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
