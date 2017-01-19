import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class SpinnerActions {

  static SPINNER_ON = '[Spinner] Start spinner';
  spinnerOn(): Action {
    return {
      type: SpinnerActions.SPINNER_ON
    };
  }

  static SPINNER_OFF = '[Spinner] Stop spinner';
  getTrackSuccess(song): Action {
    return {
      type: SpinnerActions.SPINNER_OFF
    };
  }
}
