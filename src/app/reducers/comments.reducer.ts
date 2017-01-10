import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Comment } from '../models/coment.model';

export type CommentsState = Comment[];

const initialState: CommentsState = [];

export default function (state = initialState, action: Action): CommentsState {
  switch (action.type) {
    default:
      return state;
  }
}
