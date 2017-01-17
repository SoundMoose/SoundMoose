import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Playlist } from '../models/playlist.model';


@Injectable()
export class PlaylistActions {

  static LOAD_TRACKS = '[Playlist] Load Tracks';
  loadTracks(playlist: Playlist): Action {
    return {
      type: PlaylistActions.LOAD_TRACKS,
      payload: playlist
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
