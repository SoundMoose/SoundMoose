import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Song } from '../models';
import { SongActions } from '../actions';
import * as _ from 'lodash';

export type SongListState = Song[];

const initialState: SongListState = [];

export default function (state = initialState, action: Action): SongListState {
  switch (action.type) {
    case SongActions.LOAD_SONGS_SUCCESS: {
      return action.payload;
    }

    // Addtional Cases Here!..

    default: {
      return state;
    }
  }
}