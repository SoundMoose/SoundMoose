import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { AudioControlsService } from './../../services/audio-controls.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../models/appstore.model';
import { AudioControls } from '../../models/audio-controls.model';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'audio-controls',
  styleUrls: [ './audio-controls.component.css' ],
  templateUrl: './audio-controls.component.html',
})
export class AudioControlsComponent {
  toggleAudioControls$: Observable<boolean>;

  constructor(private audioControlsService: AudioControlsService, private store$: Store<AppStore> ) {
    this.toggleAudioControls$ = this.store$.select('audiocontrols')
      .map((audioControls: AudioControls) => audioControls.showAudioControls);
  }
}
