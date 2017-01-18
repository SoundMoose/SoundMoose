import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Track } from '../models/track.model';

@Injectable()
export class FavoriteActions {

  static ADD_FAVORITE = '[Favorite] Add Favorite';
  addFavorite(track: Track): Action {
    return {
      type: FavoriteActions.ADD_FAVORITE,
      payload: track
    };
  }

  static REMOVE_FAVORITE = '[Favorite] Remove Favorite';
  removeFavorite(track: Track): Action {
    return {
      type: FavoriteActions.REMOVE_FAVORITE,
      payload: track
    };
  }

  static LOAD_FAVORITES_LIST = '[Favorite] Load Favorites List';
  loadFavoritesList(favorites: Track[]): Action {
    return {
      type: FavoriteActions.LOAD_FAVORITES_LIST,
      payload: favorites
    };
  }
}
