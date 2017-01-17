import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Track } from '../models/track.model';


@Injectable()
export class PlaylistActions {

  static LOAD_TRACKS = '[Playlist] Load Tracks';
  loadTracks(tracks: Track[]): Action {
    return {
      type: PlaylistActions.LOAD_TRACKS,
      payload: tracks
    };
  }

  static CHANGE_ORDER = '[Playlist] Change Order';
  changeOrder(oldIndex: number, newIndex: number) {
    return {
      type: PlaylistActions.CHANGE_ORDER,
      payload: { oldIndex, newIndex }
    };
  }

}
