import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../app.service';
import { AppStore } from '../../../models/appstore.model';
import { Player } from '../../../models/player.model';
import { PlayerActions } from '../../../actions/player.actions';


@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'volume-control',
  styleUrls: [ '../player.component.css' ],
  templateUrl: './volume-control.component.html'
})
export class VolumeControlComponent {
  wrapperHovered : boolean = false;

  player$ : Observable<Player>;
  volume: number;
  isMuted: boolean;
  volumeBeforeMute: number;
  playerSubscription: Subscription;


  constructor (private store$: Store<AppStore>, private playerActions: PlayerActions) {
    this.player$ = this.store$.select(s => s.player);
    this.playerSubscription = this.player$.subscribe(item => {
      this.volume = item.volume;
      this.isMuted = item.isMuted;
      this.volumeBeforeMute = item.volumeBeforeMute;
    })
  }

  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }

  private handleMouseOut() {
    window.setTimeout(() => { this.wrapperHovered = false; }, 1000);
  }

  volumeClickHandler() {
    this.store$.dispatch(this.playerActions.volumeMuteToggle(this.volume, this.isMuted));
  }

  volumeSlideHandler($event) {
    this.volume = $event.value;
    this.store$.dispatch(this.playerActions.volumeChange(this.volume, this.isMuted));
  }
}
