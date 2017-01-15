import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import {Http, Headers, Response, Request} from '@angular/http'


import { AppStore } from '../models/appstore.model';
import { spotifyClientId } from '../config/superSecretKeys';
import { Track } from '../models/track.model';
import { TrackActions } from '../actions/track.actions';
import { TrackDetailsActions } from '../actions/track-details.actions';

export interface SpotifyConfig {
  clientId: string,
  redirectUri: string,
  scope: string,
  authToken?: string,
  apiBase: string,
}

export interface SpotifyOptions {
  limit?: number,
  offset?: number,
  market?: string,
  album_type?: string,
  country?: string,
  type?: string,
  q?: string,
  timestamp?: string,
  locale?: string,
  public?: boolean,
  name?: string,
}

interface HttpRequestOptions {
  method?: string,
  url: string,
  search?: Object,
  body?: Object,
  headers?: Headers,
}

@Injectable()
export class SpotifyService {
  spotifyService: any;
  config: SpotifyConfig;

  constructor(private http:Http, private store: Store<AppStore>) {
    this.config = {
      clientId: spotifyClientId,
      redirectUri: 'http://localhost:3000/#/home',
      scope: '',
      // If you already have an auth token
      authToken: localStorage.getItem('angular2-spotify-token'),
      apiBase:  'https://api.spotify.com/v1'
    };
  }

  loadSearchResults(terms: Observable<string>, debounceMs: number = 400) {
    return terms.debounceTime(debounceMs)
                .distinctUntilChanged()
                .switchMap(term => this.doSearch(term));
  }


  doSearch(term: string) {
    return this.search(term, 'track')
    .map(data => data.tracks.items)
    .map(items => items.map(item => ({
        id: 'spotify-' + item.id,
        title: item.name,
        artist: item.artists[0].name,
        imgUrl: item.album.images[0].url,
        streamUrl: item.preview_url,
        duration: 30000
    })));
  }

 /**
  * Search Spotify
  * q = search query
  * type = artist, album or track
  */
  private search(q: string, type: string, options?: SpotifyOptions) {
    options = options || {};
    options.q = q;
    options.type = type;

    return this.api({
      method: 'get',
      url: `/search`,
      search: options
    }).map(res => res.json());
  }

  //#endregion

  //#region tracks

  private getTrack(track: string) {
    track = this.getIdFromUri(track);
    return this.api({
      method: 'get',
      url: `/tracks/${track}`
    }).map(res => res.json());
  }

  private getTracks(tracks: string | Array<string>) {
    var trackList = this.mountItemList(tracks);
    return this.api({
      method: 'get',
      url: `/tracks/`,
      search: { ids: trackList.toString() }
    }).map(res => res.json());
  }

    private toQueryString(obj: Object): string {
    var parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    };
    return parts.join('&');
  };

  private openDialog(uri, name, options, cb) {
    var win = window.open(uri, name, options);
    var interval = window.setInterval(() => {
      try {
        if (!win || win.closed) {
          window.clearInterval(interval);
          cb(win);
        }
      } catch (e) { }
    }, 1000000);
    return win;
  }

  private auth(isJson?: boolean): Object {
    var auth = {
      'Authorization': 'Bearer ' + this.config.authToken
    };
    if (isJson) {
      auth['Content-Type'] = 'application/json';
    }
    return auth;
  }

  private getHeaders(isJson?: boolean): any {
    return new Headers(this.auth(isJson));
  }

  private getIdFromUri(uri: string) {
    return uri.indexOf('spotify:') === -1 ? uri : uri.split(':')[2];
  }

  private mountItemList(items: string | Array<string>): Array<string> {
    var itemList = Array.isArray(items) ? items : items.split(',');
    itemList.forEach((value, index) => {
      itemList[index] = this.getIdFromUri(value);
    });
    return itemList;
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  private api(requestOptions: HttpRequestOptions) {
    return this.http.request(new Request({
      url: this.config.apiBase + requestOptions.url,
      method: requestOptions.method || 'get',
      search: this.toQueryString(requestOptions.search),
      body: JSON.stringify(requestOptions.body),
      headers: requestOptions.headers
    }));
  }


}
