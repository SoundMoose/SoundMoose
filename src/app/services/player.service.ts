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
import { Track } from './../models/track.model';

@Injectable()
export class PlayerService {

  currentTrack$: Observable<Track>;
  tracksList: Track[];
  currentTrackId: number;

  audioCtx: any ;
  audioSource: any;
  analyser: any;
  bufferLength: number;
  frequencyDataArray: any;  // any[] doesnt work here?
  waveformDataArray: any;

/////////////////////////////////
  // for dev
  dummyAudioElement: any;
/////////////////////////////////

   constructor(protected audio: AudioStream, private store$: Store<AppStore>, private playerActions: PlayerActions) {
    this.store$.select('tracks')
      .subscribe((item: Track[]) => this.tracksList = item);

    this.currentTrack$ = this.store$.select('player')
      .map((player: Player) => player.currentTrack)
      .distinctUntilChanged();

    this.currentTrack$
      .subscribe(track => this.currentTrackId = track.id);

    this.currentTrack$
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

    Observable.fromEvent(this.audio, 'ended')
      .subscribe(() => this.store$.dispatch(playerActions.jumpToNext(this.tracksList[this.getCurrentTrackIndex() + 1])));
      //  WILL THE CODE ABOVE SHUFFLE? NEEDS TO BE TESTED //


     ////////////////////////////// Under Development  /////////////////////////

     this.audioCtx = new AudioContext();

     ////////////////////////////////////////////////////////////////////////////
     /////// Uncomment below to create and play from dummy audio DOM element
       this.dummyAudioElement = new Audio();
       this.dummyAudioElement.src = './../assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3';
      //  this.dummyAudioElement.src = this.audio.src;
      //  this.dummyAudioElement.src = '';
      //  this.dummyAudioElement.crossOrigin = "anonymous"; // CORS :)
      //  this.dummyAudioElement.play();
      //  this.audioSource = this.audioCtx.createMediaElementSource(this.dummyAudioElement);
     ////////////////////////////////////////////////////////////////////////////

    //  console.log('this.audio = ', this.audio);
    //  console.log('this.dummyAudioElement', this.dummyAudioElement);

    this.audioSource = this.audioCtx.createMediaElementSource(this.audio);
    this.audioSource.connect(this.audioCtx.destination);
    this.audio.src = './../assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3';
    // this.audioSource.mediaElement.play();

    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.25;
    this.audioSource.connect(this.analyser);

    this.analyser.fftSize = 2048;  // Fast Fourier Transform (fft) in a certain frequency domain,
    this.bufferLength = this.analyser.frequencyBinCount;

    // Byte analyser methods
    this.frequencyDataArray = new Uint8Array(this.bufferLength);
    this.waveformDataArray = new Uint8Array(this.bufferLength);

    // this.audioSource = this.audioCtx.createMediaElementSource(this.audio);
    // this.audioSource = this.audioCtx.createMediaStreamSource(this.audio);
    this.audioSource.connect(this.audioCtx.destination);
    // this.audioSource.mediaElement.play();

    let that = this;
    setInterval(function() {
    //
    //   // Frequency Data:
      that.analyser.getByteFrequencyData(that.frequencyDataArray); // only use this line or the next
    //   // analyser.getFloatFrequencyData(frequencyDataArray); // (choose Float or Byte)
      console.log('frequencyDataArray:', that.frequencyDataArray);
    //
    //   // waveform Data:
    //   // analyser.getByteTimeDomainData(waveformDataArray);
    //   // analyser.getFloatTimeDomainData(waveformDataArray);  // remember to change wafeformDataArray to float!
    //   // console.log('waveformDataArray:', waveformDataArray);
    //
    }, 1000);

  }

  play(url: string = null): void {
    if (url) {
      this.audio.src = url;
      this.audio.crossOrigin = "anonymous"; // CORS :)
      // this.audioSource.mediaElement.play();
      // this.audio.play();
    }
    this.audio.play();
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

   getCurrentTrackIndex(): number {
    return this.tracksList.reduce((acc, cur, index) => {
      if (acc !== null) {
        return acc;
      } else if (cur.id === this.currentTrackId) {
        return index;
      } else {
        return null;
      }
    }, null);
  }

   changePosition(fraction: number) {
     this.audio.currentTime = this.audio.duration * fraction;
   }

}
