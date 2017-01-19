import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';

import { AppStore } from '../models/appstore.model';
import { FavoritesState } from '../reducers/favorites.reducer';
import { FavoriteActions } from '../actions/favorite.actions';
import { Playlist } from '../models/playlist.model';

@Injectable()
export class FavoriteService {

  favorites: Subscription;
  userId: string;

  constructor(private http: Http, private store: Store<AppStore>, private favoriteActions : FavoriteActions) {
    this.setFavoritesList();
    // skip(2) because we want to ignore first 2 events that come through this observable.
    // The first event is an emtpy object and the second is the initial object we recieve from the server.
    this.favorites = this.store.select(s => s.favorites)
      .skip(2)
      .subscribe((favorites) => {
        this.updateFavoritesList(favorites);
      });
    this.store.select(s => s.soundmooseUser)
      .subscribe((soundmooseUser) => {
        this.userId = soundmooseUser.userId;
      })
  }

  buildData(favoriteList) {
    let favorites = favoriteList.map((ele) => ({
      track_id: ele.trackId,
      title: ele.title,
      artist: ele.artist,
      img_url: ele.imgUrl,
      stream_url: ele.streamUrl,
      duration: ele.duration,
      platform: ele.platform
    }));
    return favorites;
  }

  updateFavoritesList(favoriteList: FavoritesState) {
    this.http.put(`http://www.soundmoose.com:8000/api/favorites/${this.userId}/`, this.buildData(favoriteList));
  }

  createFavoritesList() {
    this.http.post(`http://www.soundmoose.com:8000/api/favorites/${this.userId}/`, {});
  }

  setFavoritesList() {
    this.http.get(`http://www.soundmoose.com:8000/api/favorites/?user_id=${this.userId}`)
      .map(res => res.json())
      .map(res => {
        if (res.length == 0) {
          this.createFavoritesList();
        }
        this.favoriteActions.loadFavoritesList(res);
      });
  }
}
