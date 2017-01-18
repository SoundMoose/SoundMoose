import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AppStore } from '../models/appstore.model';
import { FavoritesState } from '../reducers/favorites.reducer';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Playlist } from '../models/playlist.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';

@Injectable()
export class FavoriteService {

  favorites: Subscription;
  userId: string;

  constructor(private http: Http, private store: Store<AppStore>) {
    // skip(2) because we want to ignore first 2 events that come through this observable.
    // The first event is an emtpy object and the second is the initial object we recieve from the server.
    this.favorites = this.store.select(s => s.favorites)
      .skip(2)
      .subscribe((favorites) => {
        this.updateFavorites(favorites);
      });
    this.store.select(s => s.soundmooseUser)
    .subscribe((soundmooseUser) => {
      this.userId = soundmooseUser.userId;
    })
  }

  updateFavorites(favorites: FavoritesState) {
    this.http.put(`http://www.soundmoose.com:8000/api/favorites/${this.userId}/`, favorites)
      .subscribe(res => console.log(res));
  }

  getFavorites() {
    return this.http.get(`http://www.soundmoose.com:8000/api/favorites/?user_id=${this.userId}`)
      .map(res => res.json());
  }

}
