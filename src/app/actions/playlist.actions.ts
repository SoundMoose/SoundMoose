import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Playlist } from '../models/playlist.model';
import { Track } from '../models/track.model';

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

  static REMOVE_TRACK = '[Playlist] Remove Track';
  removeTrack(trackId: string, trackPlatform: string) {
    return {
      type: PlaylistActions.REMOVE_TRACK,
      payload: { trackId, trackPlatform }
    };
  }

  static ADD_TRACK = '[Playlist] Add Track';
  addTrack(trackInfo: Track) {
    return {
      type: PlaylistActions.ADD_TRACK,
      payload: trackInfo
    };
  }
}
