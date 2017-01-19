import { Component, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/map';

import { SoundmooseUser } from '../../models/soundmoose-user.model';
import { AppStore } from '../../models/appstore.model';
import { AudioControlsActions } from '../../actions/audio-controls.actions';
import { AudioControls } from '../../models/audio-controls.model';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'header',
  styleUrls: ['header.component.css'],
  templateUrl: 'header.component.html',
  providers: [Auth]
})
export class HeaderComponent {
  toggleFrequencyOrWaveform$: Observable<boolean>;
  openDialogActive: boolean = false;
  saveDialogActive: boolean = false;
  soundmooseUser$: Observable<SoundmooseUser>;
  showActionsDropdown: boolean = false;
  showUserDropdown: boolean = false;
  actionsHovering: boolean = false;
  userHovering: boolean = false;

  constructor( private store$: Store<AppStore>, private AudioControlsActions: AudioControlsActions, private auth: Auth) {
    this.soundmooseUser$ = this.store$.select(s => s.soundmooseUser);
    this.toggleFrequencyOrWaveform$ = this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.toggleFrequencyOrWaveform)
  }

  toggleAudioControls() {
    this.store$.dispatch(this.AudioControlsActions.toggleVisualizersFreqWave());
  }
}
