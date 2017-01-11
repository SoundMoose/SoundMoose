import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'

import { AppState } from '../app.service';
import { Track } from '../../../models/track.model';
import { PlayerState } from '../../../reducers/player.reducer';
import { AppStore } from '../../../models/appstore.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'track-info',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './track-info.component.html'
})
export class TrackInfoComponent {
  player$: Observable<PlayerState>;
  currentTrack$: Observable<Track>;

  constructor (private store$: Store<AppStore>) {
    this.player$ = this.store$.select(s => s.player);
    this.currentTrack$ = this.player$.map((item : PlayerState) => item.currentTrack);
  }

  private trim(string) {
    var length = 40;
    return string.length > length ?
                    string.substring(0, length - 3) + "..." :
                    string;
  }
}
