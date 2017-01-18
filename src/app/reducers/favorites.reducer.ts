import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TrackInfo } from '../models/track-info.model';
import { FavoriteActions } from '../actions/favorite.actions';

export type FavoritesState = TrackInfo[];

const initialState: FavoritesState = [];

export default function (state = initialState, action: Action): FavoritesState {
  switch (action.type) {
    case FavoriteActions.ADD_FAVORITE:
      return [...state, action.payload];
    case FavoriteActions.REMOVE_FAVORITE:
      return state.filter(item => item.platform !== action.payload.platform && item.trackId !== action.payload.trackId);
    default:
      return state;
  }
}
