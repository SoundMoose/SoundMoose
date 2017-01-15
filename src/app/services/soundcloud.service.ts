import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

import { AppStore } from '../models/appstore.model';
import { soundcloudClientId } from '../config/superSecretKeys';
import { Track } from '../models/track.model';
import { TrackActions } from '../actions/track.actions';
import { TrackDetailsActions } from '../actions/track-details.actions';

@Injectable()
export class SoundCloudService {
  tracks: any;

  constructor(private _http:Http, private store: Store<AppStore>) {
    this.tracks = store.select('tracks');
  }

  loadTopTracks(genre) {

    // if using local proxy:
//    const topTracksUrl = 'http://localhost:4004/charts?kind=top&genre=soundcloud%3Agenres%3A' + genre + '&client_id=' + soundcloudClientId + '&limit=50&offset=0&linked_partitioning=1&app_version=1482339819';

    // deployed server:
    const topTracksUrl = 'http://138.197.88.233:4004/charts?kind=top&genre=soundcloud%3Agenres%3A' + genre + '&client_id=' + soundcloudClientId + '&limit=50&offset=0&linked_partitioning=1&app_version=1482339819';

 //   const topTracksUrl = 'http://localhost:3333/toptracks';
    this.store.dispatch({ type: TrackActions.LOAD_TRACKS_START })
    return this._http.get(topTracksUrl)
      .map(res => {
        return res.json().collection.map(item => {
          return {
            id: item.track.id,
            title: item.track.title,
            artist: (item.track.publisher_metadata && item.track.publisher_metadata.artist) ? item.track.publisher_metadata.artist : item.track.user.username,
            imgUrl: item.track.artwork_url ? item.track.artwork_url.replace('large.jpg', 't200x200.jpg') : 'assets/img/moosey.png',
            streamUrl: 'http://api.soundcloud.com/tracks/' + item.track.id + '/stream?client_id=' + soundcloudClientId,
            duration: item.track.full_duration,
            platform: 'soundcloud'
          }
        })
      })
      .map(payload => ({ type: TrackActions.LOAD_TRACKS_SUCCESS, payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  loadTrackDetails(trackId) {
    const trackDetailsUrl = 'http://api.soundcloud.com/tracks/' + trackId + '?client_id=' + soundcloudClientId;
    return this._http.get(trackDetailsUrl)
      .map(res => res.json())
      .map(item => {
        return {
            track: {
              id: item.id,
              title: item.title,
              artist: (item.publisher_metadata && item.publisher_metadata.artist) ? item.publisher_metadata.artist : item.user.username,
              imgUrl: item.artwork_url ? item.artwork_url.replace('large.jpg', 't200x200.jpg') : 'assets/img/moosey.png',
              streamUrl: 'http://api.soundcloud.com/tracks/' + item.id + '/stream?client_id=' + soundcloudClientId,
              duration: item.duration,
              platform: 'soundcloud'
            },
            waveformUrl: item.waveform_url,
            largeArtworkUrl: item.artwork_url ? item.artwork_url.replace('large.jpg', 't500x500.jpg') : 'assets/img/moosey.png',
            user: {
              id: item.user.id,
              username: item.user.username,
              avatarUrl: item.user.avatar_url
            },
            license: item.license,
            commentCount: item.comment_count,
            playbackCount: item.playback_count,
            favoriteCount: item.favoritings_count,
            description: item.description,
            created: item.created_at
          };
      })
      .map(payload => ({ type: TrackDetailsActions.LOAD_TRACK_DETAILS_SUCCESS, payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  loadComments(trackId) {
    const tracksUrl = 'http://api.soundcloud.com/tracks/' + trackId + '/comments?client_id=' + soundcloudClientId;
    // comments
    return this._http.get(tracksUrl)
      .map(res => {
        return res.json().map(item => {
          return {
            commentId: item.id,
            created: item.created_at,
            trackId: item.track_id,
            timestamp: item.timestamp,
            body: item.body,
            user: {
              id: item.user.id,
              username: item.user.username,
              avatarUrl: item.user.avatar_url
            }
          };
        });
      })
      .map(payload => ({ type: TrackDetailsActions.LOAD_COMMENTS_SUCCESS, payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  loadSearchResults(terms: Observable<string>, debounceMs: number = 400) {
    return terms.debounceTime(debounceMs)
                .distinctUntilChanged()
                .switchMap(term => this.search(term));
  }

  search(term: string) {
    const searchUrl = 'http://api.soundcloud.com/tracks/?q=' + term + '&client_id=' + soundcloudClientId;

    return this._http.get(searchUrl)
      .map(res => res.json())
      .map(items => items.map(item => ({
        id: item.id,
        title: item.title,
        artist: (item.publisher_metadata && item.publisher_metadata.artist) ? item.publisher_metadata.artist : item.user.username,
        imgUrl: item.artwork_url ? item.artwork_url.replace('large.jpg', 't200x200.jpg') : 'assets/img/moosey.png',
        streamUrl: 'http://api.soundcloud.com/tracks/' + item.id + '/stream?client_id=' + soundcloudClientId,
        duration: item.duration,
        platform: 'soundcloud'
      })));
  }

}
