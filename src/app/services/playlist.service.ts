import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { AppStore } from '../models/appstore.model';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Playlist } from '../models/playlist.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';

@Injectable()
export class PlaylistService {

  playlist;

  constructor(private http: Http, private store: Store<AppStore>) {
    this.playlist = this.store.select('playlist')
      .skip(2)
      .subscribe((playlist: Playlist) => {
        console.log(playlist);
        this.updatePlaylist(this.buildData(playlist));
      });
  }

  updatePlaylist(playlistToUpdate: any) {
    console.log('put playlist ', playlistToUpdate);
    this.http.put(`http://www.soundmoose.com:8000/api/playlists/2/`, playlistToUpdate)
      .subscribe(res => console.log(res));
  }

  buildData(playlist: Playlist) {
    let tracks = playlist.tracks.map((ele, i) => JSON.stringify({
      id: ele.id,
      order: i,
      track_id: ele.trackId,
      title: ele.title,
      artist: ele.artist,
      img_url: ele.imgUrl,
      stream_url: ele.streamUrl,
      duration: ele.duration,
      platform: ele.platform
    }));
    console.log(tracks);
    return {
      playlist_name: playlist.name,
      user_id: playlist.id,
      tracks: [JSON.stringify(tracks)]
    };
  }

  // Make API request to backend.
  getPlaylist(playlist_id: number) {
    return this.http.get(`http://www.soundmoose.com:8000/api/playlists/${playlist_id}/`)
      .map(res => res.json())
      .map(res => {
        res.tracks.sort((a, b) => a.order - b.order);
        return {
          id: res.user_id,
          name: res.playlist_name,
          tracks: res.tracks.map(ele => ({
            id: ele.id,
            trackId: ele.track_id,
            title: ele.title,
            artist: ele.artist,
            imgUrl: ele.img_url,
            streamUrl: ele.stream_url,
            duration: ele.duration,
            platform: ele.platform
          }))
        }
      });
  }

}
