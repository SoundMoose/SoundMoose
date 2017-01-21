import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';

import { Observable } from 'rxjs/Observable';
import { AppStore } from '../models/appstore.model';
import { Playlist } from '../models/playlist.model';
import { Track } from '../models/track.model';
import { SoundmooseUser } from '../models/soundmoose-user.model';
import { PlaylistActions } from '../actions/playlist.actions';

type BackendTrack = {
  track_id: string,
  title: string,
  artist: string,
  img_url: string,
  stream_url: string,
  duration: number,
  platform: string,
  order: number
};

type BackendPlaylist = {
  id: number,
  playlist_name: string,
  user_id: string,
  tracks: BackendTrack[]
};

@Injectable()
export class PlaylistService {

  playlist;

  constructor(private http: Http, private store: Store<AppStore>, private playlistActions: PlaylistActions) {
    // skip(2) because we want to ignore first 2 events that come through this observable.  The first event is an emtpy object and the second is the initial object we recieve from the server.
    this.playlist = this.store.select('playlist')
      .skip(2)
      .subscribe((playlist: Playlist) => {
        this.updatePlaylist(this.buildData(playlist));
      });

    this.store.select('soundmooseUser')
      .subscribe((userInfo: SoundmooseUser) => this.getPlaylistIds(userInfo.userId));
  }

  getPlaylistIds(userId: string) {
    this.getUserPlaylists(userId)
      .subscribe(data => {
        if (data.length === 0) {
          this.newPlaylist(userId);
        } else {
          this.getData(data[0].id);
        }
      });
  }

  newPlaylist(userId: string) {
    this.createNewPlaylist(userId)
      .subscribe((newPlaylist: Playlist) => this.getData(newPlaylist.id));
  }

  getData(playlist_id: number) {
    this.getPlaylist(playlist_id)
      .first()
      .subscribe(playlist => {
        this.store.dispatch(this.playlistActions.loadTracks(playlist))
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

  updatePlaylist(playlistToUpdate: BackendPlaylist) {
    this.http.put(`http://www.soundmoose.com:8000/api/playlists/${playlistToUpdate.id}/`, playlistToUpdate)
      .first()
      .subscribe();
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
