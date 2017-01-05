import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { PlayerService } from './../../services/player.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../models/appstore.model';
import { Player } from '../../models/player.model';
import { Observable } from 'rxjs/Observable';

// Animation Stuff
// import {
//   Input,
//   trigger,
//   state,
//   style,
//   transition,
//   animate
// } from '@angular/core';

@Component({
  selector: 'player',
  styleUrls: [ './player.component.css' ],
  templateUrl: './player.component.html',
  // animations: [
  // trigger('trackExists', [
  //     state('noTrack', style({
  //       display: 'none'
  //     })),
  //     state('track', style({
  //       display: 'block'
  //     })),
  //     transition('noTrack => track', animate('1000ms ease-in'))
  //   ])
  // ]
})
export class PlayerComponent {
  trackExists$: Observable<boolean>;

  constructor(private playerService: PlayerService, private store$: Store<AppStore> ) {
    this.trackExists$ = this.store$.select('player')
      .map((playerStatus: Player) => playerStatus.currentTrack.duration !== 0);
  }

}
