import {
   trigger,
   state,
   style,
   transition,
   animate
} from '@angular/core';
import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AudioControls } from '../../../models/audio-controls.model';
import { AudioControlsActions } from '../../../actions/audio-controls.actions';
import { PlayerService } from '../../../services/player.service';
import { AppState } from '../../app.service';
import { AppStore } from '../../../models/appstore.model';
import { Player } from '../../../models/player.model';

@Component({
  selector: 'visualization-control',
  templateUrl: './visualization-control.component.html',
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
export class VisualizationControlComponent implements OnDestroy {
  toggleFrequencyOrWaveform: boolean;
  toggleFrequencyOrWaveformSubscription: Subscription;
  showVisualization$: Observable<boolean>;
  showEqualizer: boolean;
  showEqualizerSubscription: Subscription;

  constructor(private playerService: PlayerService, private store$: Store<AppStore>, private audioControlActions: AudioControlsActions ) {
    this.showVisualization$ = this.store$.select('player')
      .map((playerStatus: Player) => playerStatus.showVisualization);

    this.showEqualizerSubscription = this.store$.select('audiocontrols')
      .map((audioControlsStatus: AudioControls) => audioControlsStatus.showEqualizer)
      .subscribe(item => this.showEqualizer = item);

    this.toggleFrequencyOrWaveformSubscription = this.store$.select('audiocontrols')
      .map((audioControlsStatus: AudioControls) => audioControlsStatus.toggleFrequencyOrWaveform)
      .subscribe(item => this.toggleFrequencyOrWaveform = item);
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

  ngOnDestroy() {
    this.showEqualizerSubscription.unsubscribe();
    this.toggleFrequencyOrWaveformSubscription.unsubscribe();
  }
}
