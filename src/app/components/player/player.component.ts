import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { PlayerService } from './../../services/player.service';

@Component({
  selector: 'player',
  styleUrls: [ './player.component.css' ],
  templateUrl: './player.component.html'
})
export class PlayerComponent {

  constructor( private playerService: PlayerService ) {}

}
