import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppStore } from './models/appstore.model';
import { AudioControlsActions } from './actions/audio-controls.actions';
import { AudioControls } from './models/audio-controls.model';
import { Auth } from './services/auth.service';

@Component({
  selector: 'app',
 // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
  providers: [Auth]
})

export class AppComponent {
  toggleFrequencyOrWaveform$: Observable<boolean>;
  openDialogActive: boolean = false;
  saveDialogActive: boolean = false;

  constructor( private store$: Store<AppStore>, private AudioControlsActions: AudioControlsActions, private auth: Auth) {

    this.toggleFrequencyOrWaveform$ = this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.toggleFrequencyOrWaveform)

  }

  toggleAudioControls() {
    this.store$.dispatch(this.AudioControlsActions.toggleVisualizersFreqWave());
  }

}
