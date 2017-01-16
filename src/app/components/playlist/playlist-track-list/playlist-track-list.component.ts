import { Component, Input } from '@angular/core';

import { Track } from '../../../models/track.model';

@Component({
  selector: 'playlist-track-list',
  styleUrls: [ './playlist-track-list.component.css' ],
  templateUrl: './playlist-track-list.component.html',
})
export class PlaylistTrackListComponent {

  @Input() playlist;

  // Testing
  items;

  constructor() {
    // this.items = this.playlist.map(ele => ele);
  }

}
