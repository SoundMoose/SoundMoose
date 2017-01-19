import { Component, Inject, Input, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { AppStore } from './../../../models/appstore.model';
import { SoundCloudService } from './../../../services/soundcloud.service';
import { SpotifyService } from './../../../services/spotify.service';

@Component({
  selector: 'game-player',
  styleUrls: ['./game-player.component.css'],
  templateUrl: './game-player.component.html'
})
export class GamePlayerComponent implements OnInit {

  start: number;
  end: number;
  audio;
  userId: string;
  hostId: string;
  platform: string;
  trackId: string;
  audioSrc: string;
  chatIframeUrl: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private store: Store<AppStore>, private soundCloudService: SoundCloudService, private spotifyService: SpotifyService, private sanitizer: DomSanitizer) {
    this.store.select(s => s.soundmooseUser)
      .first()
      .subscribe(userInfo => this.userId = userInfo.userId);

    this.start = this.route.snapshot.params['start'];
    this.end = this.route.snapshot.params['end'];
    this.platform = this.route.snapshot.params['platform'];
    this.trackId = this.route.snapshot.params['trackId'];
    this.hostId = this.route.snapshot.params['hostId'];

    let hashForCurrentUrl = Md5.hashStr(this.start + '/' + this.end + '/' + this.platform + '/' + this.trackId + '/' + this.hostId).slice(0, -3);
    this.chatIframeUrl = sanitizer.bypassSecurityTrustResourceUrl('https://tlk.io/' + hashForCurrentUrl);

    this.fetchAudioSrc(this.platform, this.trackId);

    this.store.select(s => s.trackDetails)
      .first()
      .subscribe(trackDetails => this.audioSrc = trackDetails.track.streamUrl);
  }

  ngOnInit() {
    this.audio = new Audio(this.audioSrc);
  }

  fetchAudioSrc(platform: string, trackId: string) {
    if (platform === 'soundcloud') {
      this.soundCloudService.loadTrackDetails(trackId);
    } else if (platform === 'spotify') {
      this.spotifyService.loadTrackDetails(trackId);
    }
  }

  playClip() {
    this.audio.currentTime = this.start;
    this.audio.play();
    setTimeout(() => this.audio.pause(), (this.end - this.start) * 1000);
  }
}
