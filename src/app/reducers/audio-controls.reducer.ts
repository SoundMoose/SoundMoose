import { Action } from '@ngrx/store';

import { AudioControls } from '../models/audio-controls.model';
import { AudioControlsActions } from '../actions/audio-controls.actions';

export type AudioControlsState = AudioControls;

const initialState: AudioControlsState = {
  showAudioControls: false,
};

export default function (state = initialState, action: Action): AudioControlsState {
  switch (action.type) {

    case AudioControlsActions.TOGGLE_AUDIO_CONTROLS:  {
      return Object.assign({}, state, {
          showAudioControls: !state.showAudioControls,
      });
    }

    default: {
      return state;
    }
  }
}
