// import 'rxjs/add/operator/let';
// // import 'rxjs/add/operator/pluck';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/filter';

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
  // showHide: boolean;

   constructor(private store$: Store<AppStore>, private audioControlsActions: AudioControlsActions) {

    this.showAudioControls$ = this.store$.select('audiocontrols')
      .map((audioControls: AudioControls) => audioControls.showAudioControls)

  //   this.showHide$
  //     .subscribe(audiocontrols => this.showHide = audiocontrols.showAudioControls);
  }

}
