import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class TrackDetailsActions {

  static LOAD_TRACK_DETAILS_SUCCESS = '[Track Details] Load Track Details Success';
  loadTrackDetailsSuccess(tracks): Action {
    return {
      type: TrackDetailsActions.LOAD_TRACK_DETAILS_SUCCESS,
      payload: tracks
    };
  }
  static LOAD_COMMENTS_SUCCESS = '[Track Details] Load Comments Success';
  loadCommentsSuccess(comments): Action {
    return {
      type: TrackDetailsActions.LOAD_COMMENTS_SUCCESS,
      payload: comments
    };
  }
  static LEAVE_TRACK_DETAILS_PAGE = '[Track Details] Leave Track Details Page';
  leaveTrackDetailsPage(): Action {
    return {
      type: TrackDetailsActions.LEAVE_TRACK_DETAILS_PAGE
    };
  }
}
