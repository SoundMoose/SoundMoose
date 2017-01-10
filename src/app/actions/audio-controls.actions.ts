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

  static ADJUST_BASS = '[AudioControls] Adjust Bass';
  adjustBass(bass: number): Action {
    return {
      type: AudioControlsActions.ADJUST_BASS,
      payload: {
        bass
      }
    };
  }
  static ADJUST_MIDS = '[AudioControls] Adjust Mids';
  adjustMids(mids: number): Action {
    return {
      type: AudioControlsActions.ADJUST_MIDS,
      payload: {
        mids
      }
    };
  }
  static ADJUST_TREBLE = '[AudioControls] Adjust Treble';
  adjustTreble(treble: number): Action {
    return {
      type: AudioControlsActions.ADJUST_TREBLE,
      payload: {
        treble
      }
    };
  }

}
