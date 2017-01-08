
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
  hasCanvas: boolean;

  // Waveform Visualization
  waveformDataArray: any;
  waveformBufferLength: number;
  waveformCanvas: any;
  waveformCanvasCtx: any;
  waveformWIDTH: number;
  waveformHEIGHT: number;
  sliceWidth: number;
  waveformX: number;
  waveformV: number;
  waveformY: number;
  drawWaveformVisual: any;

  constructor (private audioSrc: AudioStream, private store$: Store<AppStore>) {

    this.frequencyBufferLength = this.audioSrc.frequencyBufferLength;
    this.waveformBufferLength = this.audioSrc.waveformBufferLength;
    this.hasCanvas = false;

    window.onload = function() {
      // build frequency bar visualizer:
      this.frequencyCanvas = document.getElementById('visualizerFrequencyCanvas');
      this.frequencyCanvasCtx = this.frequencyCanvas.getContext("2d");
      this.WIDTH = this.frequencyCanvas.width;
      this.HEIGHT = this.frequencyCanvas.height;
      this.frequencyCanvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

      // build waveform oscilliscope visualizer:
      this.waveformCanvas = document.getElementById('visualizerWaveformCanvas');
      this.waveformCanvasCtx = this.waveformCanvas.getContext("2d");
      this.waveformWIDTH = this.waveformCanvas.width;
      this.waveformHEIGHT = this.waveformCanvas.height;
      this.waveformCanvasCtx.clearRect(0, 0, this.waveformWIDTH, this.waveformHEIGHT);

      this.hasCanvas = true;
      var that = this;
      setInterval(function() {
        that.frequencyDataArray = that.audioSrc.frequencyDataArray;
        that.waveformDataArray = that.audioSrc.waveformDataArray;
        that.drawFrequencyBars(that);
        that.drawWaveOscilliscope(that);
      }, 50);
    }.bind(this);
  }

  drawFrequencyBars(context) {
    if (context.hasCanvas) {
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

  drawWaveOscilliscope(context) {
    if (context.hasCanvas) {
      context.drawWaveformVisual = requestAnimationFrame(context.drawWaveOscilliscope);
      context.waveformCanvasCtx.fillStyle = 'rgb(26, 26, 26)';
      context.waveformCanvasCtx.fillRect(0, 0, context.waveformWIDTH, context.waveformHEIGHT);
      context.waveformCanvasCtx.lineWidth = 2;
      context.waveformCanvasCtx.strokeStyle = 'rgb(173, 187, 194)';;
      context.waveformCanvasCtx.beginPath();

      context.sliceWidth = context.waveformWIDTH * 1.0 / context.waveformBufferLength;
      context.waveformX = 0;

      for (var j = 0; j < context.waveformBufferLength; j++) {

        context.waveformV = context.waveformDataArray[j] / 128.0;
        context.waveformY = context.waveformV * context.waveformHEIGHT/2;

        if (j === 0) {
          context.waveformCanvasCtx.moveTo(context.waveformX, context.waveformY);
        } else {
          context.waveformCanvasCtx.lineTo(context.waveformX, context.waveformY);
        }

        context.waveformX += context.sliceWidth;
      }

      context.waveformCanvasCtx.lineTo(context.waveformCanvas.width, context.waveformCanvas.height/2);
      context.waveformCanvasCtx.stroke();
    };
  };

}
