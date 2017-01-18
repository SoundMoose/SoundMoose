import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../app.service';
import { Track } from '../../../models/track.model';
import { PlayerState } from '../../../reducers/player.reducer';
import { AppStore } from '../../../models/appstore.model';
import { Player } from '../../../models/player.model';
import { Subscription} from 'rxjs/Subscription';



@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'track-info',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './track-info.component.html'
})
export class TrackInfoComponent {
  player$: Observable<PlayerState>;
  currentTrack$: Observable<Track>;
  playerSubscription: Subscription;
  wrapperHovered : boolean = false;
  songQueue: Track[];

  constructor (private store$: Store<AppStore>) {
    this.player$ = this.store$.select(s => s.player);
    this.currentTrack$ = this.player$.map((item : PlayerState) => item.currentTrack);

    // grab the array of tracks from the store
    this.playerSubscription = this.player$.subscribe((item) => {
      this.songQueue = item.songQueue;
    });
  }
  private handleMouseOut() {
    window.setTimeout(() => { this.wrapperHovered = false; }, 1000);
  }

  private trim(string) {
    var length = 40;
    return string.length > length ?
                    string.substring(0, length - 3) + "..." :
                    string;
  }
}
