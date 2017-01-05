import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from './../../../models/appstore.model';
import { Track } from '../../../models/track.model';
import { TrackActions } from '../../../actions/track.actions';
import { Action } from '@ngrx/store';

@Component({
  selector: 'top-track-tile',
  styleUrls: ['../top-tracks.component.css'],
  templateUrl: './top-track-tile.component.html'
})

export class TopTrackTileComponent {
  @Input()
  topTrack: Track;

  buttonToggled: boolean;

  constructor(private trackActions: TrackActions, private store: Store<AppStore>) {
  }

  clickHandler() {
    this.store.dispatch(this.trackActions.togglePlayPause(this.topTrack));
  }


}
