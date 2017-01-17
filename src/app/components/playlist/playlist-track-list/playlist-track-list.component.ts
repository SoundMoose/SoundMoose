import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppStore } from '../../../models/appstore.model';
import { Track } from '../../../models/track.model';
import { PlaylistActions } from '../../../actions/playlist.actions';

@Component({
  selector: 'playlist-track-list',
  styleUrls: [ './playlist-track-list.component.css' ],
  templateUrl: './playlist-track-list.component.html',
})
export class PlaylistTrackListComponent {

  @Input() playlist: Track[];

  constructor(private store: Store<AppStore>, private playlistActions: PlaylistActions) {}

  updateList(event) {
    this.store.dispatch(this.playlistActions.changeOrder(event.oldIndex, event.newIndex));
  }

}
