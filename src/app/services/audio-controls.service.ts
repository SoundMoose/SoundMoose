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
import { AudioStream } from '../audio-element';


@Injectable()
export class AudioControlsService {
  showAudioControls$: Observable<boolean>;
  audio: any;

  constructor(protected audioStream: AudioStream, private store$: Store<AppStore>, private audioControlsActions: AudioControlsActions) {

    this.audio = audioStream.audioElement;

    this.showAudioControls$ = this.store$.select('audiocontrols')
      .map((audioControls: AudioControls) => audioControls.showAudioControls)

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.lowBand)
      .distinctUntilChanged()
      .subscribe(item => this.lowGain(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand)
      .distinctUntilChanged()
      .subscribe(item => this.midGain(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.highBand)
      .distinctUntilChanged()
      .subscribe(item => this.highGain(item));

  }

  lowGain(lowGain: number): void {
    if (this.audioStream) {
      this.audioStream.lowBand.gain.value = lowGain.gain.value;
    }
  }

  midGain(midGain: number): void {
    if (this.audioStream) {
      this.audioStream.midBand.gain.value = midGain.gain.value;
    }
  }

  highGain(highGain: number): void {
    if (this.audioStream) {
      this.audioStream.highBand.gain.value = highGain.gain.value;
    }
  }

}
