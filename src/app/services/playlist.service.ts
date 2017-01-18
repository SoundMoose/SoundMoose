import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AppStore } from '../models/appstore.model';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Playlist } from '../models/playlist.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';

@Injectable()
export class PlaylistService {

  playlist;
  // userInfo;

  constructor(private http: Http, private store: Store<AppStore>) {
    // skip(2) because we want to ignore first 2 events that come through this observable.  The first event is an emtpy object and the second is the initial object we recieve from the server.
    this.playlist = this.store.select('playlist')
      .skip(2)
      .subscribe((playlist: Playlist) => {
        this.updatePlaylist(this.buildData(playlist));
      });
  }

  getUserPlaylists(userId: string) {
    return this.http.get(`http://www.soundmoose.com:8000/api/playlists/?user_id=${userId}`)
      .map(res => res.json());
  }

  createNewPlaylist(userId: string) {
    return this.http.post('http://www.soundmoose.com:8000/api/playlists/', {
      user_id: userId,
      playlist_name: 'Default',
      tracks: []
    })
    .map(res => res.json());
  }

  updatePlaylist(playlistToUpdate: any) {
    this.http.put(`http://www.soundmoose.com:8000/api/playlists/${playlistToUpdate.id}/`, playlistToUpdate)
      .subscribe(res => console.log(res));
  }

  buildData(playlist: Playlist) {
    let tracks = playlist.tracks.map((ele, i) => ({
      order: i,
      track_id: ele.trackId,
      title: ele.title,
      artist: ele.artist,
      img_url: ele.imgUrl,
      stream_url: ele.streamUrl,
      duration: ele.duration,
      platform: ele.platform
    }));
    return {
      id: playlist.id,
      playlist_name: playlist.name,
      user_id: playlist.userId,
      tracks: tracks
    };
  }

  // Make API request to backend.
  getPlaylist(playlist_id: number) {
    return this.http.get(`http://www.soundmoose.com:8000/api/playlists/${playlist_id}/`)
      .map(res => res.json())
      .map(res => {
        res.tracks.sort((a, b) => a.order - b.order);
        return {
          id: res.id,
          userId: res.user_id,
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
