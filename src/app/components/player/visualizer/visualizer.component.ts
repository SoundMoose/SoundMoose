
import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { AppStore } from '../../../models/appstore.model';
import { AudioStream } from '../../../audio-element';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'visualizer-2D',
  templateUrl: './visualizer.component.html'
})
export class VisualizerComponent {
  frequencyDataArray: any;
  wavelengthArray: any;

  canvas: any;
  canvasCtx: any;
  WIDTH: number;
  HEIGHT: number;
  drawVisual: any;
  barWidth: number;
  barHeight: number;
  bufferLength: number;
  x: number;
  hasCanvas: boolean;

  constructor (private audioSrc: AudioStream, private store$: Store<AppStore>) {

    this.bufferLength = this.audioSrc.bufferLength;
    this.hasCanvas = false;

    window.onload = function() {
      this.canvas = document.getElementById('visualizerCanvas');
      // this.canvas = document.querySelector('.visualizer');
      this.canvasCtx = this.canvas.getContext("2d");
      this.WIDTH = this.canvas.width;
      this.HEIGHT = this.canvas.height;
      this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
      this.hasCanvas = true;

      var that = this;
      setInterval(function() {
        that.frequencyDataArray = that.audioSrc.frequencyDataArray;
        that.draw(that);
      }, 200);
    }.bind(this);
  }

  draw(context) {
    if (context.hasCanvas) {

      context.drawVisual = requestAnimationFrame(context.draw);
      context.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      context.canvasCtx.fillRect(0, 0, context.WIDTH, context.HEIGHT);
      context.barWidth = (context.WIDTH / context.bufferLength) * 2.5;
      context.barHeight;
      context.x = 0;

      for(var i = 0; i < context.bufferLength; i++) {
        context.barHeight = context.frequencyDataArray[i];
        context.canvasCtx.fillStyle = 'rgb(' + (context.barHeight+100) + ',50,50)';
        context.canvasCtx.fillRect(context.x, context.HEIGHT-context.barHeight/2, context.barWidth, context.barHeight/2);
        context.x += context.barWidth + 1;
      }
    }
  };

}
