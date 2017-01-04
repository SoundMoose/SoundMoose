import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export class PlayerActions {

  static PLAYING_SONG = '[Player] Playing Song';
  playingSong(): Action {
    return {
      type: PlayerActions.PLAYING_SONG,
    };
  }

  static PAUSING_SONG = '[Player] Pausing Song';
  pausingSong(): Action {
    return {
      type: PlayerActions.PAUSING_SONG,
    };
  }

  static VOLUME_CHANGE = '[Player] Volume Up';
  volumeChange(volume: number): Action {
    return {
      type: PlayerActions.VOLUME_CHANGE,
      payload: {
        volume
      }
    };
  }

}
