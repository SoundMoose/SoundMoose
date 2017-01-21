import {
  Component,
  OnInit,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

declare let $: any;
declare let Waveform: any;

import { AppStore } from './../../../models/appstore.model';
import { Track } from './../../../models/track.model';
import { TrackActions } from './../../../actions/track.actions';
import { TracksState } from './../../../reducers/tracks.reducer';
import { PlayerState } from './../../../reducers/player.reducer';
import { TrackDetailsState } from '../../../reducers/track-details.reducer';
import { PlayerService } from './../../../services/player.service';

@Component({
  selector: 'track-detail-top-pane',
  templateUrl: 'track-detail-top-pane.component.html',
  styleUrls: ['../track-detail.component.css'],
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
export class TrackDetailTopPaneComponent implements OnInit {
  tracksList: Track[];
  currentlyPlaying: boolean;
  trackDetails$: Observable<TrackDetailsState>;
  imgUrl: string;
  waveformUrl: string;
  track: Track;
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
  @Input() comments: Observable<any>;

  constructor(
    private store$: Store<AppStore>,
    private playerService: PlayerService,
    private sanitizer: DomSanitizer,
    private trackActions: TrackActions
  ) {
  }

  ngOnInit() {
    // grab the array of tracks from the store to be passed in when clicking play
    this.store$.select('tracks')
      .subscribe((item: Track[]) => this.tracksList = item);
    this.trackDetails$ = this.store$.select(s => s.trackDetails);
    this.trackDetailsSubscription = this.trackDetails$.subscribe(item => {
      this.track = item.track;
      this.trackId = item.track.trackId;
      if (this.track.platform === 'spotify') {
        this.spotifyEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://embed.spotify.com/?uri=spotify:track:' + this.trackId);
      }
      this.largeArtworkUrl = item.largeArtworkUrl;
      this.waveformUrl = item.waveformUrl;
      if (item.created) {
        this.created = new Date(item.created).toISOString();
      }
      if (this.waveformUrl !== '') {
        this.getWaveform();
      }
    });
    this.storeSubscription = this.store$.select(s => s.player)
      .map((playerStatus: PlayerState) => playerStatus.isPlaying && playerStatus.currentTrack.trackId === this.track.trackId)
      .subscribe(item => this.currentlyPlaying = item);

    this.secondsSubscription = this.playerService.currentProgressInSeconds$.subscribe(item => {
      this.currentProgressInMilliseconds = item * 1000;
    });

  }

  getWaveform() {
    // https://github.com/soundcloud/waveformjs endpoint
    $.getJSON('http://www.soundmoose.com:9292/w?callback=?', {
      url: this.waveformUrl.replace(/^https:\/\//i, 'http://'),
    }, function(d){
      let sound;
      let waveform = new Waveform({
        container: $('.waveform').get(0),
        data: d
      });
      let ctx = waveform.context;
      let gradient = ctx.createLinearGradient(0, 0, 0, waveform.height);
      gradient.addColorStop(0.0, '#FBBD08');
      gradient.addColorStop(1.0, '#FF9A00');
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

  private trim(str) {
    let length = 100;
    return str.length > length ?
                    str.substring(0, length - 3) + '...' :
                    str;
  }
}
