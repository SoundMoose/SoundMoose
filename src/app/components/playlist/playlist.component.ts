import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppStore } from '../../models/appstore.model';
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
    // Grab playlist info from state.
    this.playlist$ = this.store.select('playlist')
      .map((playlist: Playlist) => playlist.tracks);
  }
}
