import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Store } from '@ngrx/store';
import { AppStore } from './../../../models/appstore.model';
import { Track } from '../../../models/track.model';
import { Player } from '../../../models/player.model';
import { TrackActions } from '../../../actions/track.actions';
import { Action } from '@ngrx/store';
import { PlayerService } from '../../../services/player.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SpinnerState } from '../../../reducers/spinner.reducer';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'top-track-tile',
  styleUrls: ['../top-tracks.component.css', './top-track-tile.component.css'],
  templateUrl: './top-track-tile.component.html'
})

export class TopTrackTileComponent {
  @Input()
  topTrack: Track;

  player$: Observable<{}>;
  spinner$: Observable<{}>;
  currentlyPlaying$: Observable<boolean>;
  selected$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private trackActions: TrackActions, private store$: Store<AppStore>, private router: Router) {
    // Grab the player stream from the store
    this.player$ = this.store$.select('player');
    // Grab the spinner stream
    this.spinner$ = this.store$.select('spinner');

    // Map the player stream to see if the player is playing
    this.currentlyPlaying$ = this.player$
      .map((playerStatus: Player) => playerStatus.isPlaying && playerStatus.currentTrack.id === this.topTrack.id);
    // Map the player stream to see if the player is playing the current song
    this.selected$ = this.player$
      .map((playerStatus: Player)=> playerStatus.currentTrack.id === this.topTrack.id);
    // Map the spinner stream to see if the song is loading
    this.isLoading$ = this.spinner$
      .map((spinnerStatus: SpinnerState) => spinnerStatus.isSpinning);
  }

  clickHandler() {
    this.store$.dispatch(this.trackActions.togglePlayPause(this.topTrack));
  }

  goToDetail($event) {
    // Only go to detail page if we clicked outside of the play icon
    if ($event.target.tagName != 'I') {
      this.router.navigate(['/track', this.topTrack.id]);
    }
  }

}
