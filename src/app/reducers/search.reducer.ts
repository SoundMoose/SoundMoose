import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Track } from '../models/track.model';
import { SearchActions } from '../actions/search.actions';

export type SearchState = {
  query: string;
  results: Track[];
};

const initialState: SearchState = {
  query: '',
  results: []
};

export default function (state = initialState, action: Action): SearchState {
  switch (action.type) {
    case SearchActions.SEARCH: {
      let newState = Object.assign({}, state, {
        query: action.payload
      });
      return newState;
    }
    case SearchActions.SEARCH_SUCCESS: {
      let newState = Object.assign({}, state, {
        results: [...state.results, ...action.payload]
      });
      return newState;
    }
    case SearchActions.CLEAR_SEARCH: {
      let newState = Object.assign({}, state, {
        query: '',
        results: []
      });
      return newState;
    }
    default: {
      return state;
    }
  }
}
