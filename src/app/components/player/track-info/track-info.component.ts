import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Track } from '../../../models/track.model';
import { Player } from '../../../models/player.model';
import { AppStore } from '../../../models/appstore.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'track-info',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './track-info.component.html'
})
export class TrackInfoComponent {
  player$: Observable<Player>;
  currentTrack: Track;

  constructor (private store$: Store<AppStore>) {
    this.player$ = this.store$.select('player');
    this.player$.subscribe((item) => {
      this.currentTrack = item.currentTrack;
    });
  }

  private trim(string) {
    var length = 40;
    return string.length > length ?
                    string.substring(0, length - 3) + "..." :
                    string;
  }
}
