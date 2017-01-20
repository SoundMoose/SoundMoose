import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { SoundmooseUser } from '../models/soundmoose-user.model';

@Injectable()
export class SoundmooseUserActions {

  static SET_PROFILE_DATA = '[Soundmoose user] Set profile data';
  setProfileData(data): Action {
    return {
      type: SoundmooseUserActions.SET_PROFILE_DATA,
      payload: data
    };
  }

  static LOGGED_OUT = '[Soundmoose user] Logged out';
  loggedOut(): Action {
    return {
      type: SoundmooseUserActions.LOGGED_OUT
    };
  }
}
