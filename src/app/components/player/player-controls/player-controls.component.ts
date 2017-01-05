import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Player } from '../../../models/player.model';
import { AppStore } from '../../../models/appstore.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'player-controls',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './player-controls.component.html'
})
export class PlayerControlsComponent {
  player$: Observable<Player>;
  isPlaying: boolean;

  constructor (private store$: Store<AppStore>) {
    this.player$ = this.store$.select('player');
    this.player$.subscribe((item) => {
      this.isPlaying = item.isPlaying;
    });
  }

}
