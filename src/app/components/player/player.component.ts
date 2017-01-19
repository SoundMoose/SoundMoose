import { ChangeDetectionStrategy, OnDestroy } from '@angular/core'
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../app.service';
import { AppStore } from '../../models/appstore.model';
import { Player } from '../../models/player.model';

@Component({
//  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'player',
  styleUrls: [ './player.component.css' ],
  templateUrl: './player.component.html',

})
export class PlayerComponent implements OnDestroy {

  trackExists$: Observable<boolean>;

  constructor(private playerService: PlayerService, private store$: Store<AppStore>, private audioControlActions: AudioControlsActions ) {
    this.trackExists$ = this.store$.select('player')
      .map((playerStatus: Player) => playerStatus.currentTrack.duration !== 0);

  }
}
