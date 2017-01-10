import { Action } from '@ngrx/store';

import { AudioControls } from '../models/audio-controls.model';
import { AudioControlsActions } from '../actions/audio-controls.actions';

export type AudioControlsState = AudioControls;

const initialState: AudioControlsState = {
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

export default function (state = initialState, action: Action): AudioControlsState {
  switch (action.type) {

    case AudioControlsActions.TOGGLE_AUDIO_CONTROLS:  {
      return Object.assign({}, state, {
          showAudioControls: !state.showAudioControls,
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
      return Object.assign({}, state, {
        midBand: {
          gain: {
          value: action.payload.mids,
          }
        }
      });
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
