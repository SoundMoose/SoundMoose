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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'equalizer',
  styleUrls: [ './equalizer.component.css' ],
  templateUrl: './equalizer.component.html'
})

export class EqualizerComponent {
  wrapperHovered : boolean = false;

  audioControls$ : Observable<AudioControls>;

  highGain: any;
  midGain: any;
  lowGain: any;

  constructor (private store$: Store<AppStore>, private audioSrc: AudioStream, private AudioControlsActions: AudioControlsActions) {

    this.audioControls$ = this.store$.select(item => item.audiocontrols);
    this.audioControls$.subscribe((item) => {
      this.lowGain = item.lowBand.gain.value;
      this.midGain = item.midBand.gain.value;
      this.highGain = item.highBand.gain.value;
    });

  }

  ngOnInit() {

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
