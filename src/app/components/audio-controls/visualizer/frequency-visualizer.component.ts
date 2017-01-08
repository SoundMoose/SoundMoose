
import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { AppStore } from '../../models/appstore.model';
import { AudioStream } from '../../../audio-element';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'visualizer-2D-frequency',
  templateUrl: './frequency-visualizer.component.html'
})
export class FrequencyVisualizerComponent {

  // Frequency Visualization
  frequencyDataArray: any;
  frequencyBufferLength: number;
  frequencyCanvas: any;
  frequencyCanvasCtx: any;
  WIDTH: number;
  HEIGHT: number;
  drawFrequencyVisual: any;
  barWidth: number;
  barHeight: number;
  x: number;
  hasfrequencyCanvas: boolean;

  constructor (private audioSrc: AudioStream, private store$: Store<AppStore>) {

    this.frequencyBufferLength = this.audioSrc.frequencyBufferLength;
    this.hasfrequencyCanvas = false;

    // can't call window.onload twice, so using event listeners!
    window.addEventListener("load", function() {
      this.frequencyCanvas = document.getElementById('visualizerFrequencyCanvas');
      this.frequencyCanvasCtx = this.frequencyCanvas.getContext("2d");
      this.WIDTH = this.frequencyCanvas.width;
      this.HEIGHT = this.frequencyCanvas.height;
      this.frequencyCanvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

      this.hasfrequencyCanvas = true;
      var that = this;
      setInterval(function() {
        that.frequencyDataArray = that.audioSrc.frequencyDataArray;
        that.drawFrequencyBars(that);
      }, 50);
    }.bind(this));
  }

  drawFrequencyBars(context) {
    if (context.hasfrequencyCanvas) {
      // console.log('DRAWING FREQUENCY');
      context.drawFrequencyVisual = requestAnimationFrame(context.drawFrequencyBars);
      context.frequencyCanvasCtx.fillStyle = 'rgb(26, 26, 26)';
      context.frequencyCanvasCtx.fillRect(0, 0, context.WIDTH, context.HEIGHT);
      context.barWidth = (context.WIDTH / context.frequencyBufferLength) * 2.5;
      context.barHeight;
      context.x = 0;

      for(var i = 0; i < context.frequencyBufferLength; i++) {
        context.barHeight = context.frequencyDataArray[i];
        context.frequencyCanvasCtx.fillStyle = 'rgb('+ (context.barHeight+0) + ','+ (context.barHeight+0) + ','+ (context.barHeight+0) + ')';
        context.frequencyCanvasCtx.fillRect(context.x, context.HEIGHT-context.barHeight/2, context.barWidth, context.barHeight/2);
        context.x += context.barWidth + 1;
      }
    }
  };

}
