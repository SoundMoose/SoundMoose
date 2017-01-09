import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { PlayerService } from './../../services/player.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../models/appstore.model';
import { Player } from '../../models/player.model';
import { Observable } from 'rxjs/Observable';


import {
   trigger,
   state,
   style,
   transition,
   animate
} from '@angular/core';

@Component({
  selector: 'player',
  styleUrls: [ './player.component.css' ],
  templateUrl: './player.component.html',
  animations: [
    trigger('fadeInOut', [
      state('in', style({transform: 'translateY(0)', opacity: 0.98})),
      transition('void => *', [
        style({
          transform: 'translateY(100%)',
          opacity: 0
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
        }))
      ])
    ])
  ]
})
export class PlayerComponent {
  trackExists$: Observable<boolean>;

  constructor(private playerService: PlayerService, private store$: Store<AppStore> ) {
    this.trackExists$ = this.store$.select('player')
      .map((playerStatus: Player) => playerStatus.currentTrack.duration !== 0);
  }

}
