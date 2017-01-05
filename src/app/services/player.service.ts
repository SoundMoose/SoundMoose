// import 'rxjs/add/operator/let';
// import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppStore } from '../models/appstore.model';
import { PlayerState } from '../reducers/player.reducer';
import { AudioStream } from '../howler-element';
import { PlayerActions } from '../actions/player.actions';
import { TrackActions } from '../actions/track.actions';

@Injectable()
export class PlayerService {
  // player$: Observable<PlayerState>;
  // events$: Observable<Action>;
  //
   constructor(protected audio: AudioStream, private store$: Store<AppStore>) {
    // this.audio.play();
   }

  //   /*
  //   this.events$ = Observable.merge(
  //     Observable.fromEvent(audio, 'pause').map(PlayerActions.pauseAudio),
  //     Observable.fromEvent(audio, 'play').map(PlayerActions.playAudio),
  //   );
  //   */
  // }
  //
  // play(): void {
  //   //this.audio.play();
  // }
  //
  // pause(): void {
  //   //this.audio.pause();
  // }

}
