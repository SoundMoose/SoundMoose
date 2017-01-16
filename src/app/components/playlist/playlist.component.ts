import { Component, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppStore } from '../../models/appstore.model';
import { Observable } from 'rxjs/Observable';

import { PlaylistService } from '../../services/playlist.service';
import { Track } from '../../models/track.model';
import { PlaylistActions } from '../../actions/playlist.actions';

@Component({
  selector: 'playlist',
  styleUrls: [ './playlist.component.css' ],
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent {

  playlist$: Observable<Track[]>;

  constructor(private playlistService: PlaylistService, private store: Store<AppStore>, private playlistActions: PlaylistActions) {
    this.getData(0);

    this.playlist$ = this.store.select('playlist');

  }

  getData(playlist_id: number) {
    this.playlistService.getPlaylist(playlist_id)
      .first()
      .subscribe(playlist => {
        this.store.dispatch(this.playlistActions.loadTracks(playlist));
      });
  }

}
