import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Song } from '../models';

@Injectable()
export class SongActions {
  static LOAD_SONGS = '[Song] Load Songs';
  loadSongs(): Action {
    return {
      type: SongActions.LOAD_SONGS
    };
  }

  static LOAD_SONGS_SUCCESS = '[Song] Load Songs Success';
  loadSongsSuccess(songs): Action {
    return {
      type: SongActions.LOAD_SONGS_SUCCESS,
      payload: songs
    };
  }

  static GET_SONG = '[Song] Get Song';
  getSong(id): Action {
    return {
      type: SongActions.GET_SONG;
      payload: id
    };
  }

  static GET_SONG_SUCCESS = '[Song] Get Song Success';
  getSongSuccess(song): Action {
    return {
      type: SongActions.GET_SONG_SUCCESS,
      payload: song
    };
  }

  // More Actions Here!..
}