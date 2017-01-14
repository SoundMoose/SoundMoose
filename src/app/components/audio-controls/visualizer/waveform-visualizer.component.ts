import { ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core'
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../app.service';
import { AppStore } from '../../../models/appstore.model';
import { AudioStream } from '../../../audio-element';


@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'visualizer-2D-waveform',
  templateUrl: './waveform-visualizer.component.html'
})

export class WaveformVisualizerComponent implements OnInit, OnDestroy {
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
  hasCanvas: boolean;
  // The setInterval timer ID.
  timer: number;

  constructor (private audioSrc: AudioStream, private store$: Store<AppStore>) {

  }

  ngOnInit() {
    this.waveformBufferLength = this.audioSrc.waveformBufferLength;
    this.hasCanvas = false;

    this.waveformCanvas = document.getElementById('visualizerWaveformCanvas');
    this.waveformCanvasCtx = this.waveformCanvas.getContext("2d");
    this.waveformWIDTH = this.waveformCanvas.width;
    this.waveformHEIGHT = this.waveformCanvas.height;
    this.waveformCanvasCtx.clearRect(0, 0, this.waveformWIDTH, this.waveformHEIGHT);


    this.hasCanvas = true;
    var that = this;
    this.timer = window.setInterval(function() {
      that.waveformDataArray = that.audioSrc.waveformDataArray;
      that.drawWaveOscilliscope(that);
    }, 50);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  drawWaveOscilliscope(context) {
    if (context.hasCanvas) {

      context.drawWaveformVisual = requestAnimationFrame(context.drawWaveOscilliscope);

      let gradient = context.waveformCanvasCtx.createLinearGradient(0, 0, 0, context.waveformHEIGHT);
      gradient.addColorStop(0, '#1B1B1B');
      gradient.addColorStop(0.3, '#222222');
      gradient.addColorStop(0.8, '#222222');
      gradient.addColorStop(1, '#1B1B1B');
      context.waveformCanvasCtx.fillStyle = gradient;
      context.waveformCanvasCtx.fillRect(0, 0, context.waveformWIDTH, context.waveformHEIGHT);

      // context.waveformCanvasCtx.fillStyle = 'rgb(0, 0, 0)';
      // context.waveformCanvasCtx.fillRect(0, 0, context.waveformWIDTH, context.waveformHEIGHT);
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
