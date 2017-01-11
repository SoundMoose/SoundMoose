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
  toggleFrequencyOrWaveform$: Observable<boolean>;
  audio: any;

  constructor(protected audioStream: AudioStream, private store$: Store<AppStore>, private audioControlsActions: AudioControlsActions) {

    this.audio = audioStream.audioElement;

    this.toggleFrequencyOrWaveform$ = this.store$.select('audiocontrols')
      .map((audioControls: AudioControls) => audioControls.toggleFrequencyOrWaveform)

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

  lowGain(lowBand: any): void {
    this.audioStream.lowBand.gain.value = lowBand.gain.value*(3);
  }

  midGain(midBand: any): void {
    this.audioStream.midBand.gain.value = midBand.gain.value*(3);
  }

  highGain(highBand: any): void {
    this.audioStream.highBand.gain.value = highBand.gain.value*(3);
  }

}
