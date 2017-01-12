import { Action } from '@ngrx/store';

import { AudioControls } from '../models/audio-controls.model';
import { AudioControlsActions } from '../actions/audio-controls.actions';

export type AudioControlsState = AudioControls;

const initialState: AudioControlsState = {
  toggleFrequencyOrWaveform: true,
  showEqualizer: false,
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

export default function (state = initialState, action: Action): AudioControlsState {
  switch (action.type) {

    case AudioControlsActions.TOGGLE_VISUALIZATION_FREQ_WAVE:  {
      return Object.assign({}, state, {
          toggleFrequencyOrWaveform: !state.toggleFrequencyOrWaveform,
      });
    }

    case AudioControlsActions.TOGGLE_EQUALIZER:  {
      return Object.assign({}, state, {
          showEqualizer: !state.showEqualizer,
      });
    }

    case AudioControlsActions.ADJUST_BASS:  {
      return Object.assign({}, state, {
        lowBand: {
          gain: {
          value: action.payload.bass,
          }
        }
      });
    }
    case AudioControlsActions.ADJUST_MIDS:  {

      let bandName = "midBand" + action.payload.frequencyBandId;
      let newState = new Object();
      newState[bandName] = {
        "gain": {
          "value": action.payload.mids
        }
      };
      console.log(JSON.stringify(newState, null, 2));

      return Object.assign({}, state, newState);
    }
    case AudioControlsActions.ADJUST_TREBLE:  {
      return Object.assign({}, state, {
          highBand: {
            gain: {
              value: action.payload.treble,
            }
          }
      });
    }
    default: {
      return state;
    }
  }
}
