import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';

import { AppStore } from '../models/appstore.model';
import { AudioControlsState } from '../reducers/audio-controls.reducer';
import { AudioControlsActions } from '../actions/audio-controls.actions';
import { AudioControls } from './../models/audio-controls.model';

@Injectable()
export class AudioControlsService {
  showAudioControls$: Observable<boolean>;

  constructor(private store$: Store<AppStore>, private audioControlsActions: AudioControlsActions) {
    this.showAudioControls$ = this.store$.select('audiocontrols')
      .map((audioControls: AudioControls) => audioControls.showAudioControls)
  }

}
