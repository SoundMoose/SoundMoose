import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';

import { SoundmooseUser } from './models/soundmoose-user.model';
import { AppStore } from './models/appstore.model';
import { AudioControlsActions } from './actions/audio-controls.actions';
import { AudioControls } from './models/audio-controls.model';

@Component({
  selector: 'app',
 // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
})

export class AppComponent {
  toggleFrequencyOrWaveform$: Observable<boolean>;
  soundmooseUser$: Observable<SoundmooseUser>;

  constructor( private store$: Store<AppStore>, private AudioControlsActions: AudioControlsActions) {
    this.soundmooseUser$ = this.store$.select(s => s.soundmooseUser);
    this.toggleFrequencyOrWaveform$ = this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.toggleFrequencyOrWaveform)
  }

  toggleAudioControls() {
    this.store$.dispatch(this.AudioControlsActions.toggleVisualizersFreqWave());
  }
}
