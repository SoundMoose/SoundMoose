import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { AudioControls } from '../models/audio-controls.model';


@Injectable()
export class AudioControlsActions {

  static TOGGLE_AUDIO_CONTROLS = '[AudioControls] Toggle Showing Audio Controls';
  toggleAudioControls(): Action {
    return {
      type: AudioControlsActions.TOGGLE_AUDIO_CONTROLS,
    };
  }

}
