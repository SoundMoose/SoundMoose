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
  repeatTrack: boolean;
  shuffleTracks: boolean;

  tracksList: Track[];

  constructor (private store$: Store<AppStore>, private playerActions: PlayerActions) {
    this.player$ = this.store$.select('player');
    this.player$.subscribe((item) => {
      this.isPlaying = item.isPlaying;
      this.currentTrackId = item.currentTrack.id;
      this.repeatTrack = item.repeatTrack;
      this.shuffleTracks = item.shuffleTracks;
    });
    this.tracks$ = this.store$.select('tracks');
    this.tracks$.subscribe(tracksList => this.tracksList = tracksList);
  }

  getCurrentTrackIndex(): number {
    return this.tracksList.reduce((acc, cur, index) => {
      if (acc !== null) {
        return acc;
      } else if (cur.id === this.currentTrackId) {
        return index;
      } else {
        return null;
      }
    }, null);
  }

  toggleRepeat() {
    this.store$.dispatch(this.playerActions.toggleRepeat());
  }

  toggleShuffle() {
    this.store$.dispatch(this.playerActions.toggleShuffle());
  }

  togglePlayPause() {
    this.store$.dispatch(this.playerActions.togglePlayPause());
  }

  jumpToPrevious() {
    // Find the index of the current track
    let currentTrackIndex: number = this.getCurrentTrackIndex();

    if (this.shuffleTracks) {
      // generate a random index number between 0 and the length of the playlist
      let max = this.tracksList.length;
      let randomIdx = Math.floor(Math.random() * max);
      this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[randomIdx]));
    } else {
      // Check to make sure that we are not at the end of list
      if (currentTrackIndex !== 0) {
        this.store$.dispatch(this.playerActions.jumpToPrevious(this.tracksList[currentTrackIndex - 1]));
      } else {
        // Stop playing because you've reach the beginning of your playlist and there is nowhere to go.
        this.store$.dispatch(this.playerActions.jumpToPrevious(this.tracksList[this.tracksList.length - 1]));
      }
    }
  }

  jumpToNext() {
    // Find the index of the current track
    let currentTrackIndex: number = this.getCurrentTrackIndex();

    if (this.shuffleTracks) {
      // generate a random index number between 0 and the length of the playlist
      let max = this.tracksList.length;
      let randomIdx = Math.floor(Math.random() * max);
      this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[randomIdx]));
    } else {
      if (currentTrackIndex < this.tracksList.length - 1) {
        this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[currentTrackIndex + 1]));
      } else {
        this.store$.dispatch(this.playerActions.jumpToNext(this.tracksList[0]));
      }
    }
  }
}
