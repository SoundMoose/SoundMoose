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

  millisToMinutesSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = +((millis % 60000) / 1000).toFixed(0);
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

}
