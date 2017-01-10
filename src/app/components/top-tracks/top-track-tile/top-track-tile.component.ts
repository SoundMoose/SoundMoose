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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'top-track-tile',
  styleUrls: ['../top-tracks.component.css'],
  templateUrl: './top-track-tile.component.html'
})

export class TopTrackTileComponent {
  @Input()
  topTrack: Track;

  currentlyPlaying$: Observable<boolean>;
  selected$: Observable<boolean>;

  constructor(private trackActions: TrackActions, private store$: Store<AppStore>, private router: Router) {
    this.currentlyPlaying$ = this.store$.select('player')
      .map((playerStatus: Player) => playerStatus.isPlaying && playerStatus.currentTrack.id === this.topTrack.id);
    this.selected$ = this.store$.select('player')
      .map((playerStatus: Player)=> playerStatus.currentTrack.id === this.topTrack.id);
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
