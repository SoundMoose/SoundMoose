import 'rxjs/add/operator/let';
// import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../models/appstore.model';
import { PlayerState } from '../reducers/player.reducer';
import { AudioStream } from '../howler-element';
import { PlayerActions } from '../actions/player.actions';
import { TrackActions } from '../actions/track.actions';

import { Player } from './../models/player.model';

@Injectable()
export class PlayerService {

  constructor(protected audio: AudioStream, private store$: Store<AppStore>, private playerActions: PlayerActions) {
    this.store$.select('player')
     .map((player: Player) => player.currentTrack)
     .distinctUntilChanged()
     .subscribe(item => this.play(item.streamUrl));

    this.store$.select('player')
     .map((player: Player) => player.isPlaying)
     .distinctUntilChanged()
     .subscribe(item => !item ? this.pause() : this.play());

    this.store$.select('player')
     .map((player: Player) => player.volume)
     .distinctUntilChanged()
     .subscribe(item => this.volume(item));

    Observable.fromEvent(this.audio, 'timeupdate')
     .map((item: any) => Math.floor(item.path[0].currentTime))
     .distinctUntilChanged()
     .subscribe((item) => this.updateCurrentTime(item));
  }

  play(url: string = null): void {
    if (url) {
      this.audio.src = url;
    }
    //  this.audio.play();

    console.log(this.audio);

///////////////////////////// IN-DEVELOPMENT /////////////////////////////////////
    let audioCtx = new AudioContext();
    let newAudio = new Audio();
    let dummyUrl = './../assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3';

    // console.log('newAudio: ', newAudio);
    // console.log('AudioStream audio: ', this.audio);

    newAudio.src = dummyUrl;
    // newAudio.src = url;
    newAudio.crossOrigin = "anonymous"; // CORS :)
    this.audio.crossOrigin = "anonymous"; // CORS :)
    // console.log('newArudio.src = ' + newAudio.src);

    let source = audioCtx.createMediaElementSource(newAudio);
    // let source = audioCtx.createMediaElementSource(this.audio);
    // source.connect(audioCtx.destination);
    source.connect(audioCtx.destination);
    source.mediaElement.play();

    let analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    // analyser.connect(distortion);

    analyser.fftSize = 2048;  // Fast Fourier Transform (fft) in a certain frequency domain,
    let bufferLength = analyser.frequencyBinCount;

    // Byte analyser methods
    let frequencyDataArray = new Uint8Array(bufferLength);
    let waveformDataArray = new Uint8Array(bufferLength);

    // Float analyser methods
    // let frequencyDataArray = new Float32Array(bufferLength);
    // let waveformDataArray = new Float32Array(bufferLength);

    /// to fix -infinity dataArray bug in frequency, resource: http://stackoverflow.com/questions/14169317/interpreting-web-audio-api-fft-results

    // dataArray = dataArray.map(item=> (item - analyser.minDecibels)*(analyser.maxDecibels - analyser.minDecibels));

    setInterval(function() {

    // Frequency Data:
    analyser.getByteFrequencyData(frequencyDataArray); // only use this line or the next
    // analyser.getFloatFrequencyData(frequencyDataArray); // (choose Float or Byte)
    console.log('frequencyDataArray:', frequencyDataArray);

    // waveform Data:
    // analyser.getByteTimeDomainData(waveformDataArray);
    // analyser.getFloatTimeDomainData(waveformDataArray);  // remember to change wafeformDataArray to float!
    // console.log('waveformDataArray:', waveformDataArray);

  }, 1000);
///////////////////////// END OF IN-DEVELOPMENT ////////////////////////////////
  }

   pause(): void {
     this.audio.pause();
   }

   // takes a value from 0 - 100
   volume(volume: number): void {
     if (this.audio.src) {
       this.audio.volume = volume / 100;
     }
   }

   updateCurrentTime(time) {
     this.store$.dispatch(this.playerActions.updateCurrentTime(time));
   }

   getProgressPercentage() {
     this.store$.select('player')
   }

   changePosition(fraction: number) {
     this.audio.currentTime = this.audio.duration * fraction;
   }


}
