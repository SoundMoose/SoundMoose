import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Store} from '@ngrx/store';
import {AppStore} from '../models/appstore.model';
import 'rxjs/add/operator/map';
import {Track} from '../models/track.model';
import {soundcloudClientId} from '../config/superSecretKeys';
import {TrackActions} from '../actions/track.actions';

@Injectable()
export class SoundCloudService {
  tracks: any;
  spinner: any;

  constructor(private _http:Http, private store: Store<AppStore>) {
    this.tracks = store.select('tracks');
    this.spinner = store.select('spinner');
  }

  loadTopTracks(genre) {
    const topTracksUrl = 'http://localhost:4004/charts?kind=top&genre=soundcloud%3Agenres%3A' + genre + '&client_id=' + soundcloudClientId + '&limit=50&offset=0&linked_partitioning=1&app_version=1482339819';
 //   const topTracksUrl = 'http://localhost:3333/toptracks';
    this.store.dispatch({ type: TrackActions.LOAD_TRACKS_START })
    return this._http.get(topTracksUrl)
      .map(res => {
        return res.json().collection.map(item => {
          return {
            id: item.track.id,
            title: item.track.title,
            artist: (item.track.publisher_metadata && item.track.publisher_metadata.artist) ? item.track.publisher_metadata.artist : item.track.user.username,
            imgUrl: item.track.artwork_url ? item.track.artwork_url.replace('large.jpg', 't200x200.jpg') : '/assets/img/moosey.png',
            streamUrl: 'http://api.soundcloud.com/tracks/' + item.track.id + '/stream?client_id=' + soundcloudClientId,
            duration: item.track.full_duration
          }
        })
      })
      .map(payload => ({ type: TrackActions.LOAD_TRACKS_SUCCESS, payload }))
      .subscribe(action => this.store.dispatch(action));
  }
}

