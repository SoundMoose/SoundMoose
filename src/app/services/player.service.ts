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
     this.audio.play();

    //  //// IN DEVELOPMENT //////////////////////////////////////
    //  var audioCtx = new AudioContext(),
    //   audio = new Audio(),
    //   source,
    //   // `stream_url` you'd get from
    //   // requesting http://api.soundcloud.com/tracks/6981096.json
    //   url = './../assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3';
     //
    //   audio.src = url;
    //   source = audioCtx.createMediaElementSource(audio);
    //   source.connect(audioCtx.destination);
    //   source.mediaElement.play();
     //
    //   var analyser = audioCtx.createAnalyser();
    //   source.connect(analyser);
    //   // analyser.connect(distortion);
     //
    //   analyser.fftSize = 4096;  // Fast Fourier Transform (fft) in a certain frequency domain,
    //   var bufferLength = analyser.frequencyBinCount;
    //   // var dataArray = new Uint8Array(bufferLength);
    //   var dataArray = new Float32Array(bufferLength); // for Float analyser methods
     //
    //   // To capture frequency data, AnalyserNode.getFloatFrequencyData() and AnalyserNode.getByteFrequencyData()
    //   // To capture Waveform data, and AnalyserNode.getByteTimeDomainData() and AnalyserNode.getFloatTimeDomainData() to capture waveform data.
    //   analyser.getFloatFrequencyData(dataArray);
    //   // analyser.getByteFrequencyData(dataArray);
    //   // analyser.getByteTimeDomainData(dataArray);
    //   // analyser.getFloatTimeDomainData(dataArray);
     //
    //   // console.log('dataArray:', dataArray);
     //
    //   setInterval(function() {
    //     // console.log('Audio audioCtx', audioCtx);
    //     // console.log('Audio analyser', analyser);
    //     console.log('dataArray:', dataArray);
    //   }, 1000);
    //   //////////////////////////////////////////////////
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

}
