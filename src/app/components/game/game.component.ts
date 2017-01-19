import { Component, Inject, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
  @Input() audioSrc: string;
  @Input() platform: string;
  @Input() trackId: string;

  constructor(@Inject(DOCUMENT) private document: Document, private store: Store<AppStore>) {
    this.store.select(s => s.soundmooseUser)
      .first()
      .subscribe(userInfo => this.userId = userInfo.userId);
  }

  ngOnInit() {
    this.audio = new Audio(this.audioSrc);
  }

  handleClick() {
    this.audio.currentTime = this.start;
    this.audio.play();
    setTimeout(() => this.audio.pause(), (this.end - this.start) * 1000);
    this.relativeGameUrl = `/game/${this.platform}/${this.trackId}/${this.start}/${this.end}/${this.userId}`;
    this.absoluteGameUrl = this.document.location.origin + this.relativeGameUrl;
  }
}
