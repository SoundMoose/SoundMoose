import {
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppStore } from './../../../models/appstore.model';
import { Track } from './../../../models/track.model';
import { TrackActions } from './../../../actions/track.actions';
import { TracksState } from './../../../reducers/tracks.reducer';
import { PlayerState } from './../../../reducers/player.reducer';
import { TrackDetailsState } from '../../../reducers/track-details.reducer';
import { YoutubeService } from './../../../services/youtube.service';
import { LastfmService } from './../../../services/lastfm.service';

@Component({
  selector: 'track-detail-bottom-pane',
  templateUrl: 'track-detail-bottom-pane.component.html',
  styleUrls: ['../track-detail.component.css'],
})
export class TrackDetailBottomPaneComponent implements OnInit {

  gameToggled: boolean = false;
  trackDetails$: Observable<TrackDetailsState>;
  license: string;
  description: string;
  track: Track;
  youtubeId$: Observable<string>;
  similarArtists$: Observable<any>;
  trackDetailsSubscription: Subscription;
  trackId: string;
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
    private youtubeService: YoutubeService,
    private lastfmService: LastfmService,
    private trackActions: TrackActions
  ) {
  }

  ngOnInit() {
    this.trackDetails$ = this.store$.select(s => s.trackDetails);
    this.trackDetailsSubscription = this.trackDetails$.subscribe(item => {
      this.audioSrc = item.track.streamUrl;
      this.trackId = item.track.trackId;
      this.description = item.description;
      this.license = this.licenses[item.license] ? this.licenses[item.license] : item.license;
      this.track = item.track;
      this.youtubeId$ = this.youtubeService.searchYoutubeVideo(this.track.title + ' ' + this.track.artist);
    });
  }

  ngOnDestroy() {
    this.trackDetailsSubscription.unsubscribe();
  }

  gameToggle() {
    this.gameToggled = !this.gameToggled;
  }
}
