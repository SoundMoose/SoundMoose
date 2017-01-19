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
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;
declare var Waveform: any;

import { AppStore } from './../../models/appstore.model';
import { Track } from './../../models/track.model';
import { TrackActions } from './../../actions/track.actions';
import { TracksState } from './../../reducers/tracks.reducer';
import { PlayerState } from './../../reducers/player.reducer';
import { TrackDetailsState } from '../../reducers/track-details.reducer';
import { AudioStream } from '../../audio-element';
import { SoundCloudService } from './../../services/soundcloud.service';
import { SpotifyService } from './../../services/spotify.service';
import { PlayerService } from './../../services/player.service';
import { YoutubeService } from './../../services/youtube.service';
import { LastfmService } from './../../services/lastfm.service';

@Component({
  selector: 'track-detail',
  templateUrl: 'track-detail.component.html',
  styleUrls: ['track-detail.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({transform: 'translateX(0)', opacity: 0.98})),
      transition('void => *', [
        style({
          transform: 'translateX(-10%)',
          opacity: 0
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
        }))
      ])
    ])
  ]
})
export class TrackDetailComponent implements OnInit {
  tracksList: Track[];
  gameToggled: boolean = false;
currentlyPlaying: boolean;
  trackDetails$: Observable<TrackDetailsState>;
  comments$: Observable<any>;
  license: string;
  description: string;
  imgUrl: string;
  waveformUrl: string;
  track: Track;
  youtubeId$: Observable<string>;
  similarArtists$: Observable<any>;
  created: string;
  largeArtworkUrl: string;
  hovering: {} = {};
  currentProgressInMilliseconds: number;
  trackDetailsSubscription: Subscription;
  storeSubscription: Subscription;
  secondsSubscription: Subscription;
  platform: string;
  trackId: string;
  spotifyEmbedUrl: SafeResourceUrl;
  audioSrc: string;

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

  constructor(
    private store$: Store<AppStore>,
    private soundCloudService: SoundCloudService,
    private playerService: PlayerService,
    private youtubeService: YoutubeService,
    private spotifyService: SpotifyService,
    private lastfmService: LastfmService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private trackActions: TrackActions
  ) {
    // grab the array of tracks from the store to be passed in when clicking play
    this.store$.select('tracks')
      .subscribe((item: Track[]) => this.tracksList = item);

  }


  ngOnInit() {
    let trackId = this.route.snapshot.params['trackId'];
    this.platform = this.route.snapshot.params['platform'];
    if (this.platform == 'soundcloud') {
      this.soundCloudService.loadTrackDetails(trackId);
      this.soundCloudService.loadComments(trackId);
    } else if (this.platform == 'spotify') {
      this.spotifyService.loadTrackDetails(trackId);
      this.spotifyEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://embed.spotify.com/?uri=spotify:track:' + trackId);
    }
    this.trackDetails$ = this.store$.select(s => s.trackDetails);
    this.trackDetailsSubscription = this.trackDetails$.subscribe(item => {
      this.audioSrc = item.track.streamUrl;
      this.trackId = item.track.trackId;
      this.description = item.description;
      this.license = this.licenses[item.license] ? this.licenses[item.license] : item.license;
      this.largeArtworkUrl = item.largeArtworkUrl;
      this.waveformUrl = item.waveformUrl;
      this.track = item.track;
      if (this.track.artist) {

      }
      if (item.created) {
        this.created = new Date(item.created).toISOString();
      }
      this.youtubeId$ = this.youtubeService.searchYoutubeVideo(this.track.title + ' ' + this.track.artist);
      if (this.waveformUrl != '') {
        this.getWaveform();
      }
    });
    this.storeSubscription = this.store$.select(s => s.player)
      .map((playerStatus: PlayerState) => playerStatus.isPlaying && playerStatus.currentTrack.id === this.track.id)
      .subscribe(item => this.currentlyPlaying = item);
    this.comments$ = this.store$.select(s => s.comments);

    this.secondsSubscription = this.playerService.currentProgressInSeconds$.subscribe(item => {
      this.currentProgressInMilliseconds = item * 1000;
    });

  }

  getWaveform() {
    // https://github.com/soundcloud/waveformjs endpoint
    $.getJSON("http://www.soundmoose.com:9292/w?callback=?", {
      url: this.waveformUrl.replace(/^https:\/\//i, 'http://'),
    }, function(d){
      var sound;
      var waveform = new Waveform({
        container: $(".waveform").get(0),
        data: d
      });
      var ctx = waveform.context;
      var gradient = ctx.createLinearGradient(0, 0, 0, waveform.height);
      gradient.addColorStop(0.0, "#FBBD08");
      gradient.addColorStop(1.0, "#FF9A00");
      waveform.innerColor = gradient;
      waveform.redraw();
    });
  }

  ngOnDestroy() {
    this.secondsSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
    this.trackDetailsSubscription.unsubscribe();
  }

  clickHandler() {
    this.store$.dispatch(this.trackActions.togglePlayPause(this.track, this.tracksList));
  }


  getCommentPosition(millis) {
    // 96% is all the way to the right
    let relative = millis / this.track.duration * 96;
    return relative + '%';
  }

  private trim(string) {
    var length = 100;
    return string.length > length ?
                    string.substring(0, length - 3) + "..." :
                    string;
  }

  gameToggle() {
    this.gameToggled = !this.gameToggled;
  }

}
