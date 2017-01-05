import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Player } from '../../../models/player.model';
import { Track } from '../../../models/track.model';
import { AppStore } from '../../../models/appstore.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PlayerActions } from '../../../actions/player.actions';

@Component({
  selector: 'player-controls',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './player-controls.component.html'
})
export class PlayerControlsComponent {
  player$: Observable<Player>;
  tracks$: Observable<Track[]>;
  isPlaying: boolean;
  currentTrackId: number;
  tracksList: Track[];

  constructor (private store$: Store<AppStore>, private playerActions: PlayerActions) {
    this.player$ = this.store$.select('player');
    this.player$.subscribe((item) => {
      this.isPlaying = item.isPlaying;
      this.currentTrackId = item.currentTrack.id;
    });
    this.tracks$ = this.store$.select('tracks');
    this.tracks$.subscribe(tracksList => this.tracksList = tracksList);
  }

  getCurrentTrackIndex() {
    return this.tracksList.reduce((a, b, i) => a ? a : b.id === this.currentTrackId ? i : null, null);
  }

  toggleRepeat() {
    this.store$.dispatch(this.playerActions.toggleRepeat());
  }

  toggleShuffle() {
    this.store$.dispatch(this.playerActions.toggleShuffle());
  }

  jumpToPrevious() {
    this.store$.dispatch(this.playerActions.jumpToPrevious());
  }

  jumpToNext() {
    // Find the index of the current track
    let currentTrackIndex: number = this.getCurrentTrackIndex();

    // Check to make sure that we are not at the end of list
    if (currentTrackIndex < this.tracksList.length - 1) {
      this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[currentTrackIndex + 1]));
    } else if (true) {  // Change the conditional here to check for repeat once implemented.
      this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[0]));
    } else {
      // Stop playing because you've reach the end of your playlist and don't have repeat on.
    }
  }
}
