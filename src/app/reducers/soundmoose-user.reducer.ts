import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SoundmooseUser } from '../models/soundmoose-user.model';
import { SoundmooseUserActions } from '../actions/soundmoose-user.actions';

const initialState: SoundmooseUser = {
  loggedIn: false,
  userId: '',
  name: '',
  avatarUrl: ''
};

export default function (state = initialState, action: Action): SoundmooseUser {
  switch (action.type) {
    case SoundmooseUserActions.SET_PROFILE_DATA:
      return action.payload;
    default:
      return state;
  }
}
