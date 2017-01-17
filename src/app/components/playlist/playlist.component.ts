import { Component } from '@angular/core';

import { AppStore } from '../../models/appstore.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { PlaylistActions } from '../../actions/playlist.actions';
import { PlaylistService } from '../../services/playlist.service';
import { Track } from '../../models/track.model';

@Component({
  selector: 'playlist',
  templateUrl: './playlist.component.html',
})

export class PlaylistComponent {

  // Observable to be passed down to child component.
  playlist$: Observable<Track[]>;

  constructor(private playlistService: PlaylistService, private store: Store<AppStore>, private playlistActions: PlaylistActions) {
    // Get playlist data on load.
    this.getData(0);

    // Grab playlist info from state.
    this.playlist$ = this.store.select('playlist');
  }

  // Request data from API and update the state when it responds.
  getData(playlist_id: number) {
    this.playlistService.getPlaylist(playlist_id)
      .first()
      .subscribe(playlist => {
        this.store.dispatch(this.playlistActions.loadTracks(playlist));
      });
  }

}
