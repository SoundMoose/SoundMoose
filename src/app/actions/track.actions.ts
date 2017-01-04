import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Track } from '../models/track.model';

@Injectable()
export class TrackActions {
  static LOAD_TRACKS = '[Track] Load Tracks';
  loadTracks(): Action {
    return {
      type: TrackActions.LOAD_TRACKS
    };
  }

  static LOAD_TRACKS_SUCCESS = '[Track] Load Tracks Success';
  loadTracksSuccess(songs): Action {
    return {
      type: TrackActions.LOAD_TRACKS_SUCCESS,
      payload: songs
    };
  }

  static GET_TRACK = '[Track] Get Track';
  getTrack(id): Action {
    return {
      type: TrackActions.GET_TRACK,
      payload: id
    };
  }

  static GET_TRACK_SUCCESS = '[Track] Get Track Success';
  getTrackSuccess(song): Action {
    return {
      type: TrackActions.GET_TRACK_SUCCESS,
      payload: song
    };
  }

  // More Actions Here!..
}
