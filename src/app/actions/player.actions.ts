import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Player } from '../models/player.model';

@Injectable()
export class PlayerActions {

  static VOLUME_CHANGE = '[Player] Volume Change';
  volumeChange(volume: number): Action {
    return {
      type: PlayerActions.VOLUME_CHANGE,
      payload: {
        volume
      }
    };
  }

  // Duplicate code in Track Action for ease of implementation.
  // fix later by tying both together
  static TOGGLE_PLAY_PAUSE = '[Player] Toggle Play/Pause';
  togglePlayPause(volume: number): Action {
    return {
      type: PlayerActions.TOGGLE_PLAY_PAUSE,
    };
  }

  static TOGGLE_REPEAT = '[Player] Toggle Repeat';
  toggleRepeat(): Action {
    return {
      type: PlayerActions.TOGGLE_REPEAT,
    };
  }

  // static PAUSED_AUDIO = '[Player] Pause Audio';
  // pauseAudio(): Action {
  //   return {
  //     type: PlayerActions.PAUSED_AUDIO
  //   };
  // }

  // static PLAYING_AUDIO = '[Player] Play Audio';
  // playAudio(): Action {
  //   return {
  //     type: PlayerActions.PLAYING_AUDIO
  //   };
  // }

}
