import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { PlayerService } from './../../services/player.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../models/appstore.model';
import { Player } from '../../models/player.model';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'audio-controls',
  styleUrls: [ './audio-controls.component.css' ],
  templateUrl: './audio-controls.component.html',
})
export class AudioControlsComponent {
  toggleAudioControls$: Observable<boolean>;

  constructor(private playerService: PlayerService, private store$: Store<AppStore> ) {
    this.toggleAudioControls$ = this.store$.select('player')
      .map((playerStatus: Player) => playerStatus.toggleAudioControls === true);
  }

}
