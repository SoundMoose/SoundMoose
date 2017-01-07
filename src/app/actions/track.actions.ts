import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Track } from '../models/track.model';

@Injectable()
export class TrackActions {

  static LOAD_TRACKS_SUCCESS = '[Track] Load Tracks Success';
  loadTracksSuccess(tracks): Action {
    return {
      type: TrackActions.LOAD_TRACKS_SUCCESS,
      payload: tracks
    };
  }

  static LOAD_TRACKS_START = '[Track] Load Tracks Start';
  loadTracksStart(): Action {
    return {
      type: TrackActions.LOAD_TRACKS_START
    };
  }
  // different from Player Actions in that it will pass along a track ID
  // pause if track id is same as current track, play if new track id
  static TOGGLE_PLAY_PAUSE = '[Track] Toggle Track Play/Pause';
  togglePlayPause(currentTrack: Track): Action {
    return {
      type: TrackActions.TOGGLE_PLAY_PAUSE,
      payload: currentTrack
    };
  }

}
