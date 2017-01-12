import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'

import { AppState } from '../app.service';

import { AppStore } from '../../../models/appstore.model';
import { AudioControls } from '../../../models/audio-controls.model';
import { AudioStream } from '../../../audio-element';

import { Store } from '@ngrx/store';
import { AudioControlsActions } from '../../../actions/audio-controls.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'equalizer',
  styleUrls: [ './equalizer.component.css' ],
  templateUrl: './equalizer.component.html'
})

export class EqualizerComponent {
  wrapperHovered : boolean = false;

  audioControls$ : Observable<AudioControls>;

  bandRange: number[];
  highGain: any;
  midGain1: any;
  midGain2: any;
  midGain3: any;
  midGain4: any;
  midGain5: any;
  midGain6: any;
  midGain7: any;
  midGain8: any;
  midGain9: any;
  midGain10: any;
  lowGain: any;

  constructor (private store$: Store<AppStore>, private audioSrc: AudioStream, private AudioControlsActions: AudioControlsActions) {

    this.bandRange = [
      60,
      110,
      220,
      350,
      700,
      1600,
      3200,
      4800,
      7000,
      10000
    ];

    this.audioControls$ = this.store$.select(item => item.audiocontrols);
    this.audioControls$.subscribe((item) => {
      this.lowGain = item.lowBand.gain.value;
      this.midGain1 = item.midBand1.gain.value;
      this.midGain2 = item.midBand2.gain.value;
      this.midGain3 = item.midBand3.gain.value;
      this.midGain4 = item.midBand4.gain.value;
      this.midGain5 = item.midBand5.gain.value;
      this.midGain6 = item.midBand6.gain.value;
      this.midGain7 = item.midBand7.gain.value;
      this.midGain8 = item.midBand8.gain.value;
      this.midGain9 = item.midBand9.gain.value;
      this.midGain10 = item.midBand10.gain.value;
      this.highGain = item.highBand.gain.value;
    });

  }

  ngOnInit() {

  }

  private handleMouseOut() {
    window.setTimeout(() => { this.wrapperHovered = false; }, 1000);
  }

  bassSlideHandler($event) {
    this.lowGain = $event.value;
    this.store$.dispatch(this.AudioControlsActions.adjustBass(this.lowGain));
  }

  midSlideHandler($event, i) {
    let frequencyBandId = i+1;
    this["midGain" + frequencyBandId] = $event.value;
    // console.log('event: ',$event);
    // console.log('band: ', band);
    // console.log('i: ', i);
    this.store$.dispatch(this.AudioControlsActions.adjustMids($event.value, frequencyBandId));
  }


  trebleSlideHandler($event) {
    this.highGain = $event.value;
    this.store$.dispatch(this.AudioControlsActions.adjustTreble(this.highGain));
  }
}
