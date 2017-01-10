import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'

import { AppState } from '../app.service';

import { AppStore } from '../../../models/appstore.model';
// import { Player } from '../../../models/player.model';
import { AudioControls } from '../../../models/audio-controls.model';
import { AudioStream } from '../../../audio-element';

import { Store } from '@ngrx/store';
import { AudioControlsActions } from '../../../actions/audio-controls.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'equalizer',
  styleUrls: [ './equalizer.component.css' ],
  templateUrl: './equalizer.component.html'
})

export class EqualizerComponent {
  wrapperHovered : boolean = false;

  audioControls$ : Observable<AudioControls>;
  // audioCtx: any;
  // gainDb: number;
  // bandSplit: number[];
  // bass: number;
  // mids: number;
  // treble: number;
  // highBand: any;
  // midBand: any;
  // lowBand: any;
  highGain: any;
  midGain: any;
  lowGain: any;
  // hInvert: any;
  // lInvert: any;
  // sum: any;

  constructor (private store$: Store<AppStore>, private audioSrc: AudioStream, private AudioControlsActions: AudioControlsActions) {

    this.audioControls$ = this.store$.select(item => item.audiocontrols);
    this.audioControls$.subscribe((item) => {
      this.lowGain = item.lowBand.gain.value;
      this.midGain = item.midBand.gain.value;
      this.highGain = item.highBand.gain.value;
    });

  }

  ngOnInit() {
    // this.audioCtx = this.audioSrc.audioCtx;
    //
    // this.gainDb = -40.0;
    // this.bandSplit = [360,3600];
    //
    // this.highBand = this.audioCtx.createBiquadFilter();
    // this.highBand.type = "lowshelf";
    // this.highBand.frequency.value = this.bandSplit[0];
    // this.highBand.gain.value = this.gainDb;
    //
    // this.hInvert = this.audioCtx.createGain();
    // this.hInvert.gain.value = -1.0;
    //
    // this.midBand = this.audioCtx.createGain();
    //
    // this.lowBand = this.audioCtx.createBiquadFilter();
    // this.lowBand.type = "highshelf";
    // this.lowBand.frequency.value = this.bandSplit[1];
    // this.lowBand.gain.value = this.gainDb;
    //
    // this.lInvert = this.audioCtx.createGain();
    // this.lInvert.gain.value = -1.0;
    //
    // this.audioSrc.audioSrcNode.connect(this.lowBand);
    // this.audioSrc.audioSrcNode.connect(this.midBand);
    // this.audioSrc.audioSrcNode.connect(this.highBand);
    //
    // this.highBand.connect(this.hInvert);
    // this.lowBand.connect(this.lInvert);
    //
    // this.hInvert.connect(this.midBand);
    // this.lInvert.connect(this.midBand);
    //
    // this.lowGain = this.audioCtx.createGain();
    // this.midGain = this.audioCtx.createGain();
    // this.highGain = this.audioCtx.createGain();
    //
    // this.lowBand.connect(this.lowGain);
    // this.midBand.connect(this.midGain);
    // this.highBand.connect(this.highGain);
    //
    // this.sum = this.audioCtx.createGain();
    // this.lowGain.connect(this.sum);
    // this.midGain.connect(this.sum);
    // this.highGain.connect(this.sum);
    // this.sum.connect(this.audioCtx.destination);


    // function changeGain(string,type)
    // {
    //   var value = parseFloat(string) / 100.0;
    //
    //   switch(type)
    //   {
    //     case 'lowGain': lGain.gain.value = value; break;
    //     case 'midGain': mGain.gain.value = value; break;
    //     case 'highGain': hGain.gain.value = value; break;
    //   }
    // }

  }

  private handleMouseOut() {
    window.setTimeout(() => { this.wrapperHovered = false; }, 1000);
  }

  bassSlideHandler($event) {
    this.lowGain = $event.value / 100;
    this.store$.dispatch(this.AudioControlsActions.adjustBass(this.lowGain));
  }
  midSlideHandler($event) {
    this.midGain = $event.value / 100;
    this.store$.dispatch(this.AudioControlsActions.adjustMids(this.midGain));
  }
  trebleSlideHandler($event) {
    this.highGain = $event.value / 100;
    this.store$.dispatch(this.AudioControlsActions.adjustTreble(this.highGain));
  }
}
