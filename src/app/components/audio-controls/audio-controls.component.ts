import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'

import { AppState } from '../app.service';
import { AudioControlsService } from './../../services/audio-controls.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../models/appstore.model';
import { AudioControls } from '../../models/audio-controls.model';
import { AudioControlsActions } from '../../actions/audio-controls.actions';
import { Observable } from 'rxjs/Observable';


@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'audio-controls',
  styleUrls: [ './audio-controls.component.css' ],
  templateUrl: './audio-controls.component.html',
})
export class AudioControlsComponent {
  toggleVisualizersFreqWave$: Observable<boolean>;

  constructor(private audioControlsService: AudioControlsService, private store$: Store<AppStore>, private audioControlActions: AudioControlsActions) {
    this.toggleVisualizersFreqWave$ = this.store$.select('audiocontrols')
      .map((audioControls: AudioControls) => audioControls.toggleFrequencyOrWaveform);
  }

  toggleVisualizersFreqWave() {
    this.store$.dispatch(this.audioControlActions.toggleVisualizersFreqWave());
  }
}
