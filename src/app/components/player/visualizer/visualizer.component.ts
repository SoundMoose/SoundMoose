
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

  constructor (private audioSrc: AudioStream, private store$: Store<AppStore>) {

    this.bufferLength = this.audioSrc.bufferLength;

    setInterval(function() {
      that.frequencyDataArray = that.audioSrc.frequencyDataArray;
      that.draw();
    }, 200);

    var that = this;
    window.onload = function() {
      that.canvas = document.getElementById('visualizerCanvas');
      // that.canvas = document.querySelector('.visualizer');
      that.canvasCtx = that.canvas.getContext("2d");
      that.WIDTH = that.canvas.width;
      that.HEIGHT = that.canvas.height;
      that.canvasCtx.clearRect(0, 0, that.WIDTH, that.HEIGHT);

    };

  }

  draw() {

    this.drawVisual = requestAnimationFrame(this.draw);

    this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    this.canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.barWidth = (this.WIDTH / this.bufferLength) * 2.5;
    this.barHeight;
    this.x = 0;

    for(var i = 0; i < this.bufferLength; i++) {
      this.barHeight = this.frequencyDataArray[i];

      this.canvasCtx.fillStyle = 'rgb(' + (this.barHeight+100) + ',50,50)';
      this.canvasCtx.fillRect(this.x, this.HEIGHT-this.barHeight/2, this.barWidth, this.barHeight/2);

      this.x += this.barWidth + 1;
    }
  };

}
