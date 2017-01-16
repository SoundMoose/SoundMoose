import { Component } from '@angular/core';

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

  playlist$: Observable<string>;

  constructor(private playlistService: PlaylistService, private store: Store<AppStore>, private playlistActions: PlaylistActions) {
    this.playlist$ = this.playlistService.getPlaylist(0);

    this.playlist$
      // .take(1)
      .subscribe(playlist => this.store.dispatch(playlistActions.loadTracks(playlist)));
      // .subscribe(playlist => console.log(playlist));
  }

}
