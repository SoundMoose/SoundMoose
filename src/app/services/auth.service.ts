
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { auth0Key, auth0Domain } from '../config/superSecretKeys';

let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock(auth0Key, auth0Domain, {});

  // Store profile object in auth class
  userProfile: any;

  constructor() {
    // Set userProfile attribute if already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }


  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    this.userProfile = undefined;
  }
}
