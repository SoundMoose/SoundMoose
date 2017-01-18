import { Component, Inject, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

import { AppStore } from './../../../models/appstore.model';

import { SoundCloudService } from './../../../services/soundcloud.service';
import { SpotifyService } from './../../../services/spotify.service';

import { ActivatedRoute } from '@angular/router';

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


  constructor(private route: ActivatedRoute, private store: Store<AppStore>, private soundCloudService: SoundCloudService, private spotifyService: SpotifyService) {
    this.store.select(s => s.soundmooseUser)
      .first()
      .subscribe(userInfo => this.userId = userInfo.userId);

    this.start = this.route.snapshot.params.start;
    this.end = this.route.snapshot.params.end;
    this.platform = this.route.snapshot.params.platform;
    this.trackId = this.route.snapshot.params.trackId;
    this.hostId = this.route.snapshot.params.hostId;

    this.fetchAudioSrc(this.platform, this.trackId);

    this.store.select(s => s.trackDetails)
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
