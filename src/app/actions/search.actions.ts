import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Track } from '../models/track.model';


@Injectable()
export class SearchActions {

  static SEARCH = '[Search] Perform Search';
  search(terms: string): Action {
    return {
      type: SearchActions.SEARCH,
      payload: terms
    };
  }

  static SEARCH_SUCCESS = '[Search] Search Success (received results)';
  searchSuccess(tracks: Track[]) {
    return {
      type: SearchActions.SEARCH_SUCCESS,
      payload: tracks
    };
  }

  static CLEAR_SEARCH = '[Search] Clear search';
  clearSearch(platform: string) {
    return {
      type: SearchActions.CLEAR_SEARCH,
      payload: platform
    };
  }

}
