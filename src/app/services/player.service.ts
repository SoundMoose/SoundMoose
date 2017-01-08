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
import { Subscription} from 'rxjs/Subscription';

import { AppStore } from '../models/appstore.model';
import { PlayerState } from '../reducers/player.reducer';
import { AudioStream } from '../audio-element';
import { PlayerActions } from '../actions/player.actions';
import { TrackActions } from '../actions/track.actions';

import { Player } from './../models/player.model';
import { Track } from './../models/track.model';

@Injectable()
export class PlayerService {

  currentTrack$: Observable<Track>;
  tracksList: Track[];
  currentTrackId: number;
  audio: any;
  playingSubscription: Subscription;

   constructor(protected audioStream: AudioStream, private store$: Store<AppStore>, private playerActions: PlayerActions) {

    // this grabs the html audio element from the audio stream
    this.audio = audioStream.mediaElement;
    this.audio.crossOrigin = "anonymous"; // CORS :)

    this.store$.select('tracks')
      .subscribe((item: Track[]) => this.tracksList = item);

    this.currentTrack$ = this.store$.select('player')
      .map((player: Player) => player.currentTrack)
      .distinctUntilChanged();

    this.playingSubscription = Observable.fromEvent(this.audio, 'playing')
      .subscribe(() => this.store$.dispatch(playerActions.startAudioPlaying()));

    Observable.fromEvent(this.audio, 'loadstart')
      .subscribe(() => this.store$.dispatch(playerActions.startAudioLoading()));

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
      .map((item: any) => Math.round(item.path[0].currentTime))
      .distinctUntilChanged()
      .subscribe((item) => this.updateCurrentTime(item));

    Observable.fromEvent(this.audio, 'ended')
      .subscribe(() => this.store$.dispatch(playerActions.jumpToNext(this.tracksList[this.getCurrentTrackIndex() + 1])));

    Observable.fromEvent(this.audio, 'progress')
      .subscribe(() => {
        var ranges = [];
          for (let i = 0; i < this.audio.buffered.length; i ++) {
            ranges.push([
              this.audio.buffered.start(i) / this.audio.duration,
              this.audio.buffered.end(i) / this.audio.duration
            ]);
            // Array of tuples with ranges (fractions)
          }
          this.store$.dispatch(playerActions.setBufferedRanges(ranges));
        });
  }

  play(url: string = null): void {
    if (url) {
      this.audio.src = url;
    }
    // See http://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
    // Give the timeout enough time to avoid the race conflict.
    let waitTime = 150;

    setTimeout(() => {
      // Resume play if the element if is paused.
      if (this.audio.paused) {
        this.audio.play();
      }
    }, 150);
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
    let currentIndex = this.tracksList.reduce((acc, cur, index) => {
      if (acc !== null) {
        return acc;
      } else if (cur.id === this.currentTrackId) {
        return index;
      } else {
        return null;
      }
    }, null);

    return currentIndex === this.tracksList.length - 1 ? -1 : currentIndex;
  }

   changePosition(fraction: number) {
     this.audio.currentTime = this.audio.duration * fraction;
   }

   isAudioPlaying() {
     return this.playingSubscription;
   }

}
