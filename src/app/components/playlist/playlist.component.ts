import { Component } from '@angular/core';

import { AppStore } from '../../models/appstore.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { PlaylistActions } from '../../actions/playlist.actions';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist.model';
import { SoundmooseUser } from '../../models/soundmoose-user.model';
import { Track } from '../../models/track.model';

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
})

export class PlaylistComponent {

  // Observable to be passed down to child component.
  playlist$: Observable<Track[]>;
  // userId: number;

  constructor(private playlistService: PlaylistService, private store: Store<AppStore>, private playlistActions: PlaylistActions) {
    // Get playlist data on load.
    // this.getData(8); // User id is in state, get playlist id from GET /api/playlists/?user_id=[user id]

    // Grab playlist info from state.
    this.playlist$ = this.store.select('playlist')
      .map((playlist: Playlist) => playlist.tracks);

    this.store.select('soundmooseUser')
      .subscribe((userInfo: SoundmooseUser) => this.getPlaylistIds(userInfo.userId));
  }

  getPlaylistIds(userId: string) {
    this.playlistService.getUserPlaylists(userId)
      .subscribe(data => {
        console.log('data', data);
        if (data.length === 0) {
          this.newPlaylist(userId);
        } else {
          console.log('----------', data);
          this.getData(data[0].id);
        }
      });
  }

  newPlaylist(userId: string) {
    this.playlistService.createNewPlaylist(userId)
      .subscribe((newPlaylist: Playlist) => this.getData(newPlaylist.id));
  }

  // Request data from API and update the state when it responds.
  getData(playlist_id: number) {
    console.log(playlist_id);
    this.playlistService.getPlaylist(playlist_id)
      .first()
      .subscribe(playlist => {
        console.log(playlist);
        this.store.dispatch(this.playlistActions.loadTracks(playlist));
      });
  }

}
