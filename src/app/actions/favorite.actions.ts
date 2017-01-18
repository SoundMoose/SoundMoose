import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class FavoriteActions {

  static ADD_FAVORITE = '[Favorite] Add Favorite';
  addFavorite(trackId: string, platform: string): Action {
    return {
      type: FavoriteActions.ADD_FAVORITE,
      payload: {
        trackId,
        platform
      }
    };
  }

  static REMOVE_FAVORITE = '[Favorite] Remove Favorite';
  removeFavorite(trackId: string, platform: string): Action {
    return {
      type: FavoriteActions.REMOVE_FAVORITE,
      payload: {
        trackId,
        platform
      }
    };
  }

  static LOAD_FAVORITES_LIST = '[Favorite] Load Favorites List';
  loadFavoritesList(favorites): Action {
    return {
      type: FavoriteActions.LOAD_FAVORITES_LIST,
      payload: favorites
    };
  }
}
