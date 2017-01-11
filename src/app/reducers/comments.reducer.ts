import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TrackDetailsActions } from '../actions/track-details.actions';
import { Comment } from '../models/coment.model';

export type CommentsState = Comment[];

const initialState: CommentsState = [];

export default function (state = initialState, action: Action): CommentsState {
  switch (action.type) {
    case TrackDetailsActions.LOAD_COMMENTS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
