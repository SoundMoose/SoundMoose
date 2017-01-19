import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';

import { AppStore } from '../models/appstore.model';
import { lastfmApiKey } from '../config/superSecretKeys';

@Injectable()
export class LastfmService {
  constructor(private _http:Http, private store: Store<AppStore>) {
  }

  getSimilarTracks(trackName, artistName) {
    const queryUrl = 'http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=' + encodeURIComponent(artistName)+ '&track='+ encodeURIComponent(trackName) + '&api_key='+lastfmApiKey+'&format=json';

    return this._http.get(queryUrl)
      .map(res => res.json())
      .map(item => {
        if (item.similartracks) {
          return item.similartracks.track;
        }
      })
      .map(items => items.map(item => {
        return {
          trackName :item.name,
          artist: item.artist.name,
          lastfmUrl :item.url,
          image: item.image[1]['#text'],
          searchUrl: '/search/' + item.name + ' ' + item.artist.name
        };
      }));
  }

  getSimilarArtists(artistName) {
    const queryUrl =  'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + encodeURIComponent(artistName)+ '&api_key='+lastfmApiKey+'&format=json';
    return this._http.get(queryUrl)
      .map(res => res.json())
      .map(item => {
        if (item.similarartists) {
          return item.similarartists.artist;
        }
      })
      .map(items => items.map(item => {
        return {
          artistName: item.name,
          lastfmUrl: item.url,
          image: item.image[1]['#text'],
          searchUrl: '/search/' + item.name
        };
      }));
  }
}
