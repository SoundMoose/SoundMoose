import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Track } from '../models/track.model';
import { FavoriteActions } from '../actions/favorite.actions';

export type FavoritesState = Track[];

const initialState: FavoritesState = [];

export default function (state = initialState, action: Action): FavoritesState {
  switch (action.type) {
    case FavoriteActions.ADD_FAVORITE:
      return [...state, action.payload];
    case FavoriteActions.REMOVE_FAVORITE:
      return state.filter(item => item.platform !== action.payload.platform && item.trackId !== action.payload.trackId);
    case FavoriteActions.LOAD_FAVORITES_LIST:
      return action.payload;
    default:
      return state;
  }
}
