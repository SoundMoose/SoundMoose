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
      .map((audiocontrols: AudioControls) => audiocontrols.midBand1)
      .distinctUntilChanged()
      .subscribe(item => this.midGain1(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand2)
      .distinctUntilChanged()
      .subscribe(item => this.midGain2(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand3)
      .distinctUntilChanged()
      .subscribe(item => this.midGain3(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand4)
      .distinctUntilChanged()
      .subscribe(item => this.midGain4(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand5)
      .distinctUntilChanged()
      .subscribe(item => this.midGain5(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand6)
      .distinctUntilChanged()
      .subscribe(item => this.midGain6(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand7)
      .distinctUntilChanged()
      .subscribe(item => this.midGain7(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand8)
      .distinctUntilChanged()
      .subscribe(item => this.midGain8(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand9)
      .distinctUntilChanged()
      .subscribe(item => this.midGain9(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.midBand10)
      .distinctUntilChanged()
      .subscribe(item => this.midGain10(item));

    this.store$.select('audiocontrols')
      .map((audiocontrols: AudioControls) => audiocontrols.highBand)
      .distinctUntilChanged()
      .subscribe(item => this.highGain(item));
  }

  lowGain(lowBand: any): void {
    this.audioStream.lowBand.gain.value = lowBand.gain.value;
  }

  midGain1(midBand1: any): void {
    this.audioStream.midBand1.gain.value = midBand1.gain.value;
  }

  midGain2(midBand2: any): void {
    this.audioStream.midBand2.gain.value = midBand2.gain.value;
  }

  midGain3(midBand3: any): void {
    this.audioStream.midBand3.gain.value = midBand3.gain.value;
  }

  midGain4(midBand4: any): void {
    this.audioStream.midBand4.gain.value = midBand4.gain.value;
  }

  midGain5(midBand5: any): void {
    this.audioStream.midBand5.gain.value = midBand5.gain.value;
  }

  midGain6(midBand6: any): void {
    this.audioStream.midBand6.gain.value = midBand6.gain.value;
  }

  midGain7(midBand7: any): void {
    this.audioStream.midBand7.gain.value = midBand7.gain.value;
  }

  midGain8(midBand8: any): void {
    this.audioStream.midBand8.gain.value = midBand8.gain.value;
  }

  midGain9(midBand9: any): void {
    this.audioStream.midBand9.gain.value = midBand9.gain.value;
  }

  midGain10(midBand10: any): void {
    this.audioStream.midBand10.gain.value = midBand10.gain.value;
  }

  highGain(highBand: any): void {
    this.audioStream.highBand.gain.value = highBand.gain.value;
  }

}
