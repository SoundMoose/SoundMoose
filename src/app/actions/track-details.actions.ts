import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';


@Injectable()
export class TrackDetailsActions {

  static LOAD_TRACK_DETAILS_SUCCESS = '[Track] Load Track Details Success';
  loadTrackDetailsSuccess(tracks): Action {
    return {
      type: TrackDetailsActions.LOAD_TRACK_DETAILS_SUCCESS,
      payload: tracks
    };
  }

}
