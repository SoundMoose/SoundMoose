import { Action } from '@ngrx/store';

import { Song } from '../models';
import { SongActions } from '../actions';

export type SongState = Song;

const initialState: SongState = {
  id: 0,
  name: '',
  artist: '',
  imgUrl: '',
  streamUrl: ''
};

export default function (state = initialState, action: Action): HeroState {
  switch (action.type) {
    case SongActions.GET_SONG_SUCCESS: {
      return action.payload;
    }

    // ..

    default: {
      return state;
    }
  }
}