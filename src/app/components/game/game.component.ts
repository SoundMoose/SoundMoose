import { Component, Inject, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PlayerService } from '../../services/player.service';
import { AppStore } from './../../models/appstore.model';

@Component({
  selector: 'game',
  styleUrls: ['./game.component.css'],
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  start: number = 0;
  end: number = 0;
  audio;
  absoluteGameUrl: string;
  relativeGameUrl: string;
  userId: string;
  started: boolean = false;
  @Input() audioSrc: string;
  @Input() platform: string;
  @Input() trackId: string;
  currentProgressInSeconds: number;
  showLinks: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document, private store: Store<AppStore>, private playerService: PlayerService) {
    this.store.select(s => s.soundmooseUser)
      .first()
      .subscribe(userInfo => this.userId = userInfo.userId);
    this.playerService.currentProgressInSeconds$.subscribe(item => {
      this.currentProgressInSeconds = item;
    });
  }

  ngOnInit() {
    this.audio = new Audio(this.audioSrc);
  }

  handlePreviewClick() {
    this.audio.currentTime = this.start;
    this.audio.play();
    setTimeout(() => this.audio.pause(), (this.end - this.start) * 1000);
    this.relativeGameUrl = `/game/${this.platform}/${this.trackId}/${this.start}/${this.end}/${this.userId}`;
    this.absoluteGameUrl = this.document.location.origin + this.relativeGameUrl;
    this.showLinks = true;
  }

  handleStartEndClick() {
    if (!this.started) {
      this.start = this.currentProgressInSeconds;
    } else {
      this.end = this.currentProgressInSeconds;
    }
    this.started = !this.started;
  }

  private millisToMinutesSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = +((millis % 60000) / 1000).toFixed(0);
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
