import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export class PlayerActions {

  // implement further actions here

  static VOLUME_CHANGE = '[Player] Volume Change';
  volumeChange(volume: number): Action {
    return {
      type: PlayerActions.VOLUME_CHANGE,
      payload: {
        volume
      }
    };
  }

}
