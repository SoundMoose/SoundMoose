import { Component, Input } from '@angular/core';

import { Track } from '../../../models/track.model';

@Component({
  selector: 'playlist-track-details',
  styleUrls: [ './playlist-track-details.component.css' ],
  templateUrl: './playlist-track-details.component.html',
})
export class PlaylistTrackDetailsComponent {

  @Input() track: Track;

  constructor() {

  }

}
