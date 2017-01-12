import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppStore } from './../../models/appstore.model';
import { Track } from './../../models/track.model';
import { TrackActions } from './../../actions/track.actions';
import { TracksState } from './../../reducers/tracks.reducer';
import { PlayerState } from './../../reducers/player.reducer';
import { TrackDetailsState } from '../../reducers/track-details.reducer';
import { AudioStream } from '../../audio-element';
import { SoundCloudService } from './../../services/soundcloud.service';
import { YoutubeService } from './../../services/youtube.service';


@Component({
  selector: 'track-detail',
  templateUrl: 'track-detail.component.html',
  styleUrls: ['track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {
 constructor(
    private store$: Store<AppStore>,
    private soundCloudService: SoundCloudService,
    private youtubeService: YoutubeService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private trackActions: TrackActions
  ) {
  }
  currentlyPlaying$: Observable<boolean>;
  trackDetails$: Observable<TrackDetailsState>;
  comments$: Observable<any>;
  license: string;
  description: string;
  imgUrl: string;
  waveformUrl: string;
  track: Track;
  youtubeId$: Observable<string>;
  created: string;
  largeArtworkUrl: string;

  licenses: {} = {
    'no-rights-reserved': 'No rights reserved',
    'all-rights-reserved': 'All rights reserved',
    'cc-by': 'CC BY',
    'cc-by-nc': 'CC BY NC',
    'cc-by-nd': 'CC BY ND',
    'cc-by-sa': 'CC BY SA',
    'cc-by-nc-nd': 'CC BY NC ND',
    'cc-by-nc-sa': 'CC BY NC SA'
  };

  ngOnInit() {
    let trackId = this.route.snapshot.params['trackId'];
    this.soundCloudService.loadTrackDetails(trackId);
    this.soundCloudService.loadComments(trackId);
    this.trackDetails$ = this.store$.select(s => s.trackDetails);
    this.trackDetails$.subscribe(item => {
      this.description = item.description;
      this.license = this.licenses[item.license] ? this.licenses[item.license] : item.license;
      this.largeArtworkUrl = item.largeArtworkUrl;
      this.waveformUrl = item.waveformUrl;
      this.track = item.track;
      this.created = item.created;
      this.youtubeId$ = this.youtubeService.searchYoutubeVideo(this.track.title + ' ' + this.track.artist);
    });
    this.currentlyPlaying$ = this.store$.select(s => s.player)
      .map((playerStatus: PlayerState) => playerStatus.isPlaying && playerStatus.currentTrack.id === this.track.id);
    this.comments$ = this.store$.select(s => s.comments);
  }

  clickHandler() {
    this.store$.dispatch(this.trackActions.togglePlayPause(this.track));
  }

  private getTrackTime(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = +((millis % 60000) / 1000).toFixed(0);
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
