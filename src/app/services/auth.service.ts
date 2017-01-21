import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import { auth0Key, auth0Domain } from '../config/superSecretKeys';
import { AppStore } from '../models/appstore.model';
import { SoundmooseUserActions } from '../actions/soundmoose-user.actions';

let Auth0Lock = require('auth0-lock').default;
let Auth0 = require('auth0-js').WebAuth;

@Injectable()
export class Auth {

  // Configure Auth0
  lock = new Auth0Lock(auth0Key, auth0Domain, { redirect: false });
  auth0 = new Auth0({clientID: auth0Key, domain: auth0Domain});

  // Store profile object in auth class
  userProfile: {};

  constructor(private router: Router, private store: Store<AppStore>, private soundmooseUserActions: SoundmooseUserActions) {
    // Set userProfile attribute if already saved profile
    if (this.authenticated()) {
      this.setUserProfile(JSON.parse(localStorage.getItem('profile')));
    }
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          console.log(error);
          return;
        }
        profile.user_metadata = profile.user_metadata || {};
        localStorage.setItem('profile', JSON.stringify(profile));
        this.setUserProfile(profile);
      });
    });
    this.lock.on('authorization_error', authResult => {
      console.log(authResult);
    });

    //this.handleRedirectWithHash();
  }

  private setUserProfile(profile) {
    this.userProfile = profile;
    this.store.dispatch(this.soundmooseUserActions.setProfileData({
      loggedIn: this.authenticated(),
      userId: profile.identities[0].user_id,
      name: profile.name,
      avatarUrl: profile.picture
    }));
  }

  private handleRedirectWithHash() {
    // From https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/issues/40#issuecomment-265170465
    this.router.events.take(1).subscribe(event => {
      if (/access_token/.test(event.url) || /error/.test(event.url)) {

        let authResult = this.auth0.parseHash(window.location.hash, (err) => console.log(err.error, err.errorDescription));

        if (authResult && authResult.idToken) {
          this.lock.emit('authenticated', authResult);
        }

        if (authResult && authResult.error) {
          this.lock.emit('authorization_error', authResult);
        }
      }
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
    this.store.dispatch(this.soundmooseUserActions.loggedOut());
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    this.userProfile = undefined;
    this.router.navigate(['/home']);
  }
}
