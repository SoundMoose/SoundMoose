import { Component, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../app.service';
import { PlayerService } from '../../../services/player.service';
import { Player } from '../../../models/player.model';
import { Track } from '../../../models/track.model';
import { TracksState } from '../../../reducers/tracks.reducer';
import { PlayerActions } from '../../../actions/player.actions';
import { PlayerState } from '../../../reducers/player.reducer';
import { AppStore } from '../../../models/appstore.model';

@Component({
  selector: 'player-controls',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './player-controls.component.html'
})
export class PlayerControlsComponent implements OnDestroy {
  player$: Observable<Player>;
  tracks$: Observable<Track[]>;
  isPlaying: boolean;
  currentTrackId: string;
  repeatTrack: boolean;
  shuffleTracks: boolean;
  showVisualization: boolean;
  playerSubscription: Subscription;
  tracksList: Track[];
  tracksSubscription: Subscription;
  currentId: number;
  songQueue: Track[];

  constructor (private store$: Store<AppStore>, private playerActions: PlayerActions, private playerService: PlayerService) {
    this.player$ = this.store$.select(s => s.player);
    this.playerSubscription = this.player$.subscribe((item) => {
      this.isPlaying = item.isPlaying;
      this.currentTrackId = item.currentTrack.trackId;
      this.repeatTrack = item.repeatTrack;
      this.shuffleTracks = item.shuffleTracks;
      this.showVisualization = item.showVisualization;
      this.currentId = item.currentId;
      this.songQueue = item.songQueue;
    });
    this.tracks$ = this.store$.select(s => s.tracks);
    this.tracksSubscription = this.tracks$.subscribe(tracksList => this.tracksList = tracksList);
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
    this.tracksSubscription.unsubscribe();
  }

  jumpToPrevious() {
    this.playerService.jumpToPrevious();
  }

  jumpToNext() {
    this.playerService.jumpToNext();
  }

  toggleRepeat() {
    this.store$.dispatch(this.playerActions.toggleRepeat());
  }

  toggleShuffle() {
    this.store$.dispatch(this.playerActions.toggleShuffle());
  }

  toggleVisualization() {
    this.store$.dispatch(this.playerActions.toggleShowVisualization());
  }

  togglePlayPause() {
    this.store$.dispatch(this.playerActions.togglePlayPause());
  }

}
