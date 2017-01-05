import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from './../../../models/appstore.model';
import { Track } from '../../../models/track.model';
import { TrackActions } from '../../../actions/track.actions';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'top-track-tile',
  styleUrls: ['../top-tracks.component.css'],
  templateUrl: './top-track-tile.component.html'
})

export class TopTrackTileComponent {
  @Input()
  topTrack: Track;

  currentlyPlaying$: Observable<boolean>;
  selected$: Observable<boolean>;

  constructor(private trackActions: TrackActions, private store$: Store<AppStore>) {
    this.currentlyPlaying$ = this.store$.select('player')
      .map(playerStatus => playerStatus.isPlaying && playerStatus.currentTrack.id === this.topTrack.id);
    this.selected$ = this.store$.select('player')
      .map(playerStatus => playerStatus.currentTrack.id === this.topTrack.id);
  }

  clickHandler() {
    this.store$.dispatch(this.trackActions.togglePlayPause(this.topTrack));
  }


}
