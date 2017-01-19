import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStore } from '../../../models/appstore.model';
import { PlaylistActions } from '../../../actions/playlist.actions';
import { Track } from '../../../models/track.model';


@Component({
  selector: 'playlist-track-list',
  templateUrl: './playlist-track-list.component.html'
})
export class PlaylistTrackListComponent {

  // Playlist info being passed in from parent component.
  @Input() playlist: Track[];

  constructor(private store: Store<AppStore>, private playlistActions: PlaylistActions) {}

  // Update the order of the playlist in the state.
  updateList(event) {
    this.store.dispatch(this.playlistActions.changeOrder(event.oldIndex, event.newIndex));
  }
}
