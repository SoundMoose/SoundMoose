
import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Player } from '../../../models/player.model';
import { AppStore } from '../../../models/appstore.model';
import { AudioStream } from '../../../audio-element';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'visualizer-2D',
  styleUrls: [ './visualizer.component.css' ],
  templateUrl: './visualizer.component.html'
})
export class VisualizerComponent {
  // player$: Observable<Player>;
  audioSrc: any;
  frequencyDataArray: any;
  wavelengthArray: any;

  constructor (private audioSrc: AudioStream, private store$: Store<AppStore>) {
    var that = this;
    setInterval(function() {
      console.log('frequencyDataArray:', that.audioSrc.frequencyDataArray);
    }, 500);
  }

}
