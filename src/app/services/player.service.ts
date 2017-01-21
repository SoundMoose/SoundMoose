import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription} from 'rxjs/Subscription';

import 'rxjs/add/operator/let';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

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
  audio: HTMLAudioElement;
  playingSubscription: Subscription;
  progressInfo: {};
  currentProgressInSeconds$: Observable<number>;
  player$: Observable<Player>;
  playerSubscription: Subscription;
  isPlaying: boolean;
  repeatTrack: boolean;
  shuffleTracks: boolean;
  currentId: number;
  songQueue: Track[];

  constructor(protected audioStream: AudioStream, private store$: Store<AppStore>, private playerActions: PlayerActions) {
    // this grabs the html audio element from the audio stream
    this.audio = audioStream.audioElement;
    this.audio.crossOrigin = "anonymous"; // CORS :)

    this.store$.select('tracks')
      .subscribe((item: Track[]) => this.tracksList = item);

    this.currentTrack$ = this.store$.select('player')
      .map((player: Player) => player.currentTrack)
      .distinctUntilChanged();

      //////////////////////////////////////////////
    // this.currentId = this.store$.select('player')
    //   .map((player: Player) => player.currentId)
    //   .distinctUntilChanged();
    //
    // this.songQueue = this.store$.select('player')
    //   .map((player: Player) => player.songQueue)
    //   .distinctUntilChanged();
    this.player$ = this.store$.select(s => s.player);

    this.playerSubscription = this.player$.subscribe((item) => {
      this.isPlaying = item.isPlaying;
      this.repeatTrack = item.repeatTrack;
      this.shuffleTracks = item.shuffleTracks;
      this.currentId = item.currentId;
      this.songQueue = item.songQueue;
    });
    //////////////////////////////////////////////

    this.playingSubscription = Observable.fromEvent(this.audio, 'playing')
      .subscribe(() => this.store$.dispatch(playerActions.startAudioPlaying({
        // Not currently used:
        millisecondProgressWhenStartedPlaying: this.audio.currentTime*1000,
        timestampWhenStartedPlaying: Date.now()
      })));

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

    Observable.fromEvent(this.audio, 'ended')
      .subscribe(() => this.jumpToNext()

      // this.store$
      //   .dispatch(playerActions
      //     .jumpToNext(this.tracksList[this.getCurrentTrackIndex() + 1])
      //   )
      );

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

    this.currentProgressInSeconds$ = TimerObservable.create(0, 1000)
    .map(item => this.audio.currentTime);

  }

  play(url: string = null): void {
    if (url) {
      // setting up audio for garbage collection:
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();

      this.audio.src = url;

      //////////  For caibrating the frequency graph and equalizer: ///////////
      // this.audio.src = '../../assets/sounds/10kHz_44100Hz_16bit_30sec.mp3';
      // this.audio.src = '../../assets/sounds/1kHz_44100Hz_16bit_30sec.mp3';
      // this.audio.src = '../../assets/sounds/440Hz_44100Hz_16bit_30sec.mp3';
      // this.audio.src = '../../assets/sounds/250Hz_44100Hz_16bit_30sec.mp3';
      // this.audio.src = '../../assets/sounds/100Hz_44100Hz_16bit_30sec.mp3';
      // this.audio.src = '../../assets/sounds/Broke_For_Free_-_01_-_Night_Owl.mp3';

    }

    // See http://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
    // Give the timeout enough time to avoid the race conflict.
    let waitTime = 200;

    setTimeout(() => {
      if (this.audio.paused) {
        this.audio.play();
      }
    }, waitTime);
  }

  pause(): void {
    this.audio.pause();
  }

  jumpToPrevious() {
    if (this.shuffleTracks) {
      // generate a random index number between 0 and the length of the playlist
      let max = this.songQueue.length;
      let randomIdx = Math.floor(Math.random() * max);
      this.store$.dispatch(this.playerActions
        .jumpToNext(this.songQueue[randomIdx], randomIdx));
    } else {
      // Check to make sure that we are not at the end of list
      if (this.currentId !== 0) {
        this.store$.dispatch(this.playerActions
          .jumpToPrevious(this.songQueue[this.currentId - 1], this.currentId - 1));
      } else {
        this.store$.dispatch(this.playerActions
          .jumpToPrevious(this.songQueue[this.songQueue.length - 1], this.songQueue.length - 1));
      }
    }
  }

  jumpToNext() {
    if (this.shuffleTracks) {
      // generate a random index number between 0 and the length of the playlist
      let max = this.songQueue.length;
      let randomIdx = Math.floor(Math.random() * max);
      this.store$.dispatch(this.playerActions
        .jumpToNext(this.songQueue[randomIdx], randomIdx)
      );
    } else {
      if (this.currentId < this.songQueue.length - 1) {
        this.store$.dispatch(this.playerActions
          .jumpToNext(this.songQueue[this.currentId + 1], this.currentId + 1));
      } else {
        this.store$.dispatch(this.playerActions
          .jumpToNext(this.songQueue[0], 0));
      }
    }
  }

  // takes a value from 0 - 100
  volume(volume: number): void {
    if (this.audio.src) {
      this.audio.volume = volume / 100;
    }
  }

  updateCurrentTime(time) {
    // this.store$.dispatch(this.playerActions.updateCurrentTime(time));
  }

  getProgressPercentage() {
    this.store$.select('player')
  }

  getCurrentTrackIndex(): number {
    let currentIndex = this.tracksList.reduce((acc, cur, index) => {
      if (acc !== null) {
        return acc;
      } else if (cur.id === this.currentTrackId) {
      // } else if (cur.trackId === this.currentTrackId.toString()) {
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
