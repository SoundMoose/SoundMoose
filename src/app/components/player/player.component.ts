import {
   trigger,
   state,
   style,
   transition,
   animate
} from '@angular/core';
import { ChangeDetectionStrategy, OnDestroy } from '@angular/core'
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../app.service';
import { AppStore } from '../../models/appstore.model';
import { AudioControls } from '../../models/audio-controls.model';
import { AudioControlsActions } from '../../actions/audio-controls.actions';
import { Player } from '../../models/player.model';
import { PlayerService } from './../../services/player.service';


@Component({
//  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'player',
  styleUrls: [ './player.component.css' ],
  templateUrl: './player.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({transform: 'translateY(0)', opacity: 0.98})),
      transition('void => *', [
        style({
          transform: 'translateY(100%)',
          opacity: 0
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
        }))
      ])
    ])
  ]
})
export class PlayerComponent implements OnDestroy {
  trackExists$: Observable<boolean>;
  showVisualization$: Observable<boolean>;
  toggleFrequencyOrWaveform: boolean;
  showEqualizer: boolean;
  showEqualizerSubscription: Subscription;
  toggleFrequencyOrWaveformSubscription: Subscription;

  constructor(private playerService: PlayerService, private store$: Store<AppStore>, private audioControlActions: AudioControlsActions ) {
    this.trackExists$ = this.store$.select('player')
      .map((playerStatus: Player) => playerStatus.currentTrack.duration !== 0);

    this.showVisualization$ = this.store$.select('player')
      .map((playerStatus: Player) => playerStatus.showVisualization);

    this.showEqualizerSubscription = this.store$.select('audiocontrols')
      .map((audioControlsStatus: AudioControls) => audioControlsStatus.showEqualizer)
      .subscribe(item => this.showEqualizer = item);

    this.toggleFrequencyOrWaveformSubscription = this.store$.select('audiocontrols')
      .map((audioControlsStatus: AudioControls) => audioControlsStatus.toggleFrequencyOrWaveform)
      .subscribe(item => this.toggleFrequencyOrWaveform = item);
  }

  ngOnDestroy() {
    this.showEqualizerSubscription.unsubscribe();
    this.toggleFrequencyOrWaveformSubscription.unsubscribe();
  }

  toggleEqualizer() {
    this.store$.dispatch(this.audioControlActions.toggleShowEqualizer());
  }

  toggleVisualization(typeSelected) {
    if (typeSelected === 'wave' && this.toggleFrequencyOrWaveform) {
      this.store$.dispatch(this.audioControlActions.toggleVisualizersFreqWave());
    } else if (typeSelected === 'freq' && !this.toggleFrequencyOrWaveform) {
      this.store$.dispatch(this.audioControlActions.toggleVisualizersFreqWave());
    }
  }

}
