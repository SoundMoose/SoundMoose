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
    // this.setFavoritesList();
    // skip(2) because we want to ignore first 2 events that come through this observable.
    // The first event is an emtpy object and the second is the initial object we recieve from the server.
    // this.favorites = this.store.select(s => s.favorites)
    //   .skip(1)
    //   .subscribe((favorites) => {
    //     console.log('--- favorites store updated');
    //     this.updateFavoritesList(favorites);
    //   });

    this.store.select(s => s.soundmooseUser)
      .first()
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
    return {
      user_id: this.userId,
      favorites
    };
  }

  updateFavoritesList(favoriteList: FavoritesState) {
    console.log('UPDATE DATABASE', favoriteList);
    this.http.put(`http://www.soundmoose.com:8000/api/favorites/${this.userId}/`, this.buildData(favoriteList))
      .first()
      .map(res => res.json())
      .subscribe(res => console.log('-updated list', res));
  }

  createFavoritesList() {
    console.log('CEATE NEW LIST');
    this.http.post(`http://www.soundmoose.com:8000/api/favorites/`, {
      'user_id': this.userId,
      'favorites': []
    })
      .first()
      .map(res => res.json())
      .subscribe(res => {
        console.log('-created list', res);
        this.store.dispatch(this.favoriteActions.loadFavoritesList(res.favorites))
      });
  }

  setFavoritesList() {
    console.log('GET LIST');
    this.http.get(`http://www.soundmoose.com:8000/api/favorites/?user_id=${this.userId}`)
      .first()
      .map(res => res.json())
      .subscribe(res => {
        console.log('-fetched list', res);
        if (res.length == 0) {
          this.createFavoritesList();
        } else {
          this.store.dispatch(this.favoriteActions.loadFavoritesList(res));
        }
      });
  }
}
